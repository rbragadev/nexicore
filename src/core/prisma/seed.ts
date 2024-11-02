import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.professional.create({
    data: {
      name: 'Dr. João Silva',
      specialty: 'Cardiologista',
      availability: [
        { dayOfWeek: 1, startTime: '09:00', endTime: '11:00' },
        { dayOfWeek: 3, startTime: '14:00', endTime: '16:00' },
        { dayOfWeek: 5, startTime: '10:00', endTime: '12:00' },
      ],
    },
  });

  await prisma.professional.create({
    data: {
      name: 'Dra. Maria Oliveira',
      specialty: 'Clínico Geral',
      availability: [
        { dayOfWeek: 2, startTime: '08:00', endTime: '10:00' },
        { dayOfWeek: 4, startTime: '13:00', endTime: '15:00' },
        { dayOfWeek: 6, startTime: '09:00', endTime: '11:00' },
      ],
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
