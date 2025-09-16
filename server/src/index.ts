import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 🔹 Users
  await prisma.user.createMany({
    data: [
      { username: 'adithya', passwordHash: '1234', role: 'admin' },
      { username: 'tharun', passwordHash: '1234', role: 'controller' },
      { username: 'likkitha', passwordHash: '1234', role: 'auditor' },
    ],
    skipDuplicates: true,
  });

  // 🔹 Sections
  await prisma.section.createMany({
    data: [
      { name: 'Section A', occupancyStatus: 'occupied' },
      { name: 'Section B', occupancyStatus: 'free' },
      { name: 'Section C', occupancyStatus: 'occupied' },
      { name: 'Section D', occupancyStatus: 'maintenance' },
      { name: 'Section E', occupancyStatus: 'occupied' },
      { name: 'Section F', occupancyStatus: 'free' },
    ],
    skipDuplicates: true,
  });

  // Get sections back for FK mapping
  const sectionA = await prisma.section.findFirst({ where: { name: 'Section A' } });
  const sectionB = await prisma.section.findFirst({ where: { name: 'Section B' } });
  const sectionC = await prisma.section.findFirst({ where: { name: 'Section C' } });
  const sectionD = await prisma.section.findFirst({ where: { name: 'Section D' } });
  const sectionE = await prisma.section.findFirst({ where: { name: 'Section E' } });
  const sectionF = await prisma.section.findFirst({ where: { name: 'Section F' } });

  // 🔹 Trains (currentSectionId must be numeric → reference to sections.id)
  await prisma.train.createMany({
    data: [
      { trainNumber: '12001', status: 'active', priority: 1, currentSectionId: sectionA?.id, lastUpdate: new Date('2025-09-14T08:30:00') },
      { trainNumber: '12002', status: 'delayed', priority: 2, currentSectionId: sectionB?.id, lastUpdate: new Date('2025-09-14T09:00:00') },
      { trainNumber: '12003', status: 'active', priority: 3, currentSectionId: sectionC?.id, lastUpdate: new Date('2025-09-14T09:30:00') },
      { trainNumber: '12004', status: 'maintenance', priority: 4, currentSectionId: sectionD?.id, lastUpdate: new Date('2025-09-14T10:00:00') },
      { trainNumber: '12005', status: 'active', priority: 2, currentSectionId: sectionE?.id, lastUpdate: new Date('2025-09-14T10:30:00') },
      { trainNumber: '12006', status: 'delayed', priority: 1, currentSectionId: sectionF?.id, lastUpdate: new Date('2025-09-14T11:00:00') },
    ],
    skipDuplicates: true,
  });

  // 🔹 Conflicts
  if (sectionA && sectionC) {
    await prisma.conflict.createMany({
      data: [
        {
          sectionId: sectionA.id,
          train1Id: 1,
          train2Id: 2,
          detectedAt: new Date('2025-09-14T08:45:00'),
          resolved: false
        },
        {
          sectionId: sectionC.id,
          train1Id: 3,
          train2Id: 4,
          detectedAt: new Date('2025-09-14T09:45:00'),
          resolved: true,
          resolvedAt: new Date('2025-09-14T10:00:00')
        }
      ],
      skipDuplicates: true,
    });
  }

  // 🔹 Logs (Audit Logs)
  await prisma.log.createMany({
    data: [
      {
        eventType: 'login',
        description: 'User 1 logged in',
        userId: 1,
        timestamp: new Date('2025-09-14T08:00:00')
      },
      {
        eventType: 'resolve_conflict',
        description: 'User 2 resolved a conflict',
        userId: 2,
        timestamp: new Date('2025-09-14T09:50:00')
      }
    ],
    skipDuplicates: true,
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
