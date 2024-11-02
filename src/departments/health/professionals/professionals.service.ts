import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class ProfessionalsService {
  constructor(private prisma: PrismaService) {}
  async findAvailabilityByName(name: string) {
    const professional = await this.prisma.professional.findFirst({
      where: { name },
    });

    if (!professional) {
      return null;
    }

    const availability = professional.availability as {
      dayOfWeek: number;
      startTime: string;
      endTime: string;
    }[];

    return {
      id: professional.id,
      name: professional.name,
      specialty: professional.specialty,
      availability: availability.map((a) => ({
        dayOfWeek: a.dayOfWeek,
        startTime: a.startTime,
        endTime: a.endTime,
      })),
    };
  }

  async findAllAvailabilities() {
    const professionals = await this.prisma.professional.findMany();

    return professionals.map((professional) => ({
      name: professional.name,
      specialty: professional.specialty,
      availability: (
        professional.availability as {
          dayOfWeek: number;
          startTime: string;
          endTime: string;
        }[]
      ).map((a) => ({
        dayOfWeek: a.dayOfWeek,
        startTime: a.startTime,
        endTime: a.endTime,
      })),
    }));
  }

  async findProfessionalDataByName(name: string) {
    const cleanedName = name.replace(/^(Dr\.|Dra\.)\s*/i, '').trim();
    return this.prisma.professional.findFirst({
      where: { name: cleanedName },
    });
  }
}
