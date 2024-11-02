import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ProfessionalsService } from 'src/departments/health/professionals/professionals.service';

@Injectable()
export class NaturalLanguageService {
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey = process.env.OPENAI_API_KEY;

  constructor(private readonly profissionalService: ProfessionalsService) {}

  async askQuestion(question: string): Promise<string> {
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
      Você é um assistente para uma clínica médica. Você tem a seguinte lista de médicos e suas disponibilidades:
      ${allAvailabilityText}
      Responda de acordo com a pergunta do usuário. Se o usuário perguntar por um médico específico, forneça os horários desse médico. Se o usuário perguntar por todos os médicos disponíveis, responda com uma lista completa dos médicos e suas especialidades e horários.
      Pergunta do usuário: "${question}"
    `;

    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo', // Ou 'gpt-3.5-turbo' se preferir
          messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: question },
          ],
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
      return 'Desculpe, não consegui processar sua pergunta no momento.';
    }
  }
}
