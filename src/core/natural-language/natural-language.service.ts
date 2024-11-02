import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ProfessionalsService } from 'src/departments/health/professionals/professionals.service';
import { SchedulingService } from '../scheduling/scheduling.service';

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

  private initializeSession(userId: string): void {
    if (!this.sessions.has(userId)) {
      const initialMessage = {
        role: 'system',
        content:
          'Você é um assistente para uma clínica médica, auxiliando em agendamentos e consultas.',
      };
      this.sessions.set(userId, {
        messages: [initialMessage],
        collectedData: {},
      });
    }
  }

  async askQuestion(userId: string, question: string): Promise<string> {
    this.initializeSession(userId);
    const session = this.sessions.get(userId)!;
    const { messages, collectedData } = session;

    messages.push({ role: 'user', content: question });

    let contextPrompt = 'Dados já coletados:\n';
    if (collectedData.professionalName) {
      contextPrompt += `- Médico: ${collectedData.professionalName}\n`;
    }
    if (collectedData.appointmentDate) {
      contextPrompt += `- Data: ${collectedData.appointmentDate}\n`;
    }
    if (collectedData.patientName) {
      contextPrompt += `- Paciente: ${collectedData.patientName}\n`;
    }
    contextPrompt += '\n';

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

    const prompt = `
      ${contextPrompt}
      ${allAvailabilityText}
      
      - Se o usuário pedir para agendar um horário com um médico específico e todos os dados estiverem completos, retorne um JSON com o seguinte formato:
      {
        "action": "schedule",
        "professionalName": "Nome do Médico",
        "date": "YYYY-MM-DDTHH:MM:SS",
        "patientName": "Nome do Paciente"
      }
      - Caso contrário, continue coletando informações adicionais conforme necessário.
    `;
    messages.push({ role: 'system', content: prompt });

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

      const gptResponse = response.data.choices[0].message.content;

      messages.push({ role: 'assistant', content: gptResponse });

      if (gptResponse.includes('"action": "schedule"')) {
        try {
          const jsonResponse = JSON.parse(gptResponse);
          if (jsonResponse.action === 'schedule') {
            collectedData.professionalName = jsonResponse.professionalName;
            collectedData.appointmentDate = jsonResponse.date;
            collectedData.patientName = jsonResponse.patientName;
            console.log('Dados para agendamento detectados:', jsonResponse);
          }
        } catch (jsonError) {
          console.error('Erro ao analisar JSON de resposta:', jsonError);
        }
      }

      return gptResponse;
    } catch (error) {
      console.error('Erro ao conectar com a API do OpenAI:', error);
      return 'Desculpe, não consegui processar sua pergunta no momento.';
    }
  }
}
