import { Prisma } from '@prisma/client';
export class Scheduling implements Prisma.ScheduleUncheckedCreateInput {
  id?: number;
  professionalId: number;
  userId: number;
  patientName: string;
  date: string | Date;
  status: string;
}
