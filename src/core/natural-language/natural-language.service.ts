import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ProfessionalsService } from 'src/departments/health/professionals/professionals.service';
import { SchedulingService } from '../scheduling/scheduling.service';
import { CreateSchedulingDto } from '../scheduling/dto/create-scheduling.dto';

interface DepartmentConfig {
  departmentName: string;
  promptTemplate: string;
}

interface SessionData {
  messages: any[];
  collectedData: {
    professionalName?: string;
    appointmentDate?: string;
    patientName?: string;
  };
}

@Injectable()
export class NaturalLanguageService {
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey = process.env.OPENAI_API_KEY;
  private sessions: Map<string, SessionData> = new Map();

  constructor(
    private readonly profissionalService: ProfessionalsService,
    private readonly schedulingService: SchedulingService,
  ) {}

  private initializeSession(userId: string, config: DepartmentConfig): void {
    if (!this.sessions.has(userId)) {
      const user = {
        id: userId,
        name: 'Usuário',
        email: 'erikavsb@mail.com',
        cpf: '10620901608',
      };
      const initialMessage = {
        role: 'system',
        content: `Você é um assistente para o departamento de ${config.departmentName}, auxiliando ${user?.name} em tarefas específicas.`,
      };
      this.sessions.set(userId, {
        messages: [initialMessage],
        collectedData: {
          patientName: user?.name,
        },
      });
    }
  }

  private async createPrompt(
    userId: string,
    config: DepartmentConfig,
  ): Promise<string> {
    const session = this.sessions.get(userId)!;
    const { collectedData } = session;

    let contextPrompt = 'Dados já coletados:\n';
    if (collectedData.professionalName)
      contextPrompt += `- Médico: ${collectedData.professionalName}\n`;
    if (collectedData.appointmentDate)
      contextPrompt += `- Data: ${collectedData.appointmentDate}\n`;
    if (collectedData.patientName)
      contextPrompt += `- Paciente: ${collectedData.patientName}\n`;

    const allProfessionals =
      await this.profissionalService.findAllAvailabilities();
    const allAvailabilityText = allProfessionals
      .map((p) => {
        const times = p.availability
          .map((a) => `Dia ${a.dayOfWeek}, das ${a.startTime} às ${a.endTime}`)
          .join('; ');
        return `Dr. ${p.name} (especialista em ${p.specialty}) está disponível nos horários: ${times}`;
      })
      .join('\n');

    return `
      ${config.promptTemplate}
      ${contextPrompt}

      Lista de médicos e suas disponibilidades:
      ${allAvailabilityText}
      
      - Se o usuário pedir para agendar um horário com um médico específico e todos os dados estiverem completos, retorne **apenas** um JSON com o seguinte formato:
      {
        "action": "schedule",
        "professionalName": "Nome do Médico",
        "date": "YYYY-MM-DDTHH:MM:SS",
        "patientName": "Nome do Paciente"
      }
      - Não forneça nenhuma outra explicação ou texto, apenas retorne o JSON. Caso contrário, continue coletando informações adicionais conforme necessário.
      - **Nota:** O nome do paciente já foi fornecido como "${collectedData.patientName}".
    `;
  }

  private async callGptApi(messages: any[]): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages,
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Erro ao conectar com a API do OpenAI:', error);
      throw new Error(
        'Desculpe, não consegui processar sua pergunta no momento.',
      );
    }
  }

  private async processGptResponse(
    gptResponse: string,
    userId: string,
  ): Promise<string> {
    const session = this.sessions.get(userId)!;
    session.messages.push({ role: 'assistant', content: gptResponse });

    if (gptResponse.includes('"action": "schedule"')) {
      try {
        const jsonResponse = JSON.parse(gptResponse);
        if (jsonResponse.action === 'schedule') {
          const professional =
            await this.profissionalService.findProfessionalDataByName(
              jsonResponse.professionalName,
            );
          if (!professional) {
            return `Não foi possível encontrar o profissional ${jsonResponse.professionalName}.`;
          }

          const createScheduleDto = new CreateSchedulingDto();
          createScheduleDto.professionalId = professional.id;
          createScheduleDto.userId = Number(userId);
          createScheduleDto.patientName = jsonResponse.patientName;
          createScheduleDto.date = jsonResponse.date;
          createScheduleDto.status = 'scheduled';

          await this.schedulingService.createSchedule(createScheduleDto);
          return `Agendamento confirmado com sucesso para o Dr. ${jsonResponse.professionalName} no dia ${jsonResponse.date}.`;
        }
      } catch (jsonError) {
        console.error('Erro ao analisar JSON de resposta:', jsonError);
        return 'Desculpe, houve um erro ao processar o agendamento.';
      }
    }

    return gptResponse;
  }

  async askQuestion(
    userId: string,
    question: string,
    config: DepartmentConfig,
  ): Promise<string> {
    this.initializeSession(userId, config);
    const session = this.sessions.get(userId)!;

    session.messages.push({ role: 'user', content: question });
    const prompt = await this.createPrompt(userId, config);
    session.messages.push({ role: 'system', content: prompt });

    const gptResponse = await this.callGptApi(session.messages);
    return this.processGptResponse(gptResponse, userId);
  }
}
