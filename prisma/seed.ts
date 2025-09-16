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
  const sections = await prisma.section.createMany({
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
      { trainNumber: '12002', status: 'delayed', priority: 2, currentSectionId: sectionB?.id, lastUpdate: new Date('2025-09-14T08:45:00') },
      { trainNumber: '12003', status: 'active', priority: 1, currentSectionId: sectionC?.id, lastUpdate: new Date('2025-09-14T09:00:00') },
      { trainNumber: '12004', status: 'maintenance', priority: 3, lastUpdate: new Date('2025-09-14T07:15:00') },
      { trainNumber: '12005', status: 'cancelled', priority: 5, lastUpdate: new Date('2025-09-14T06:50:00') },
      { trainNumber: '12006', status: 'active', priority: 2, currentSectionId: sectionD?.id, lastUpdate: new Date('2025-09-14T09:10:00') },
      { trainNumber: '12007', status: 'delayed', priority: 4, currentSectionId: sectionE?.id, lastUpdate: new Date('2025-09-14T08:20:00') },
      { trainNumber: '12008', status: 'active', priority: 1, currentSectionId: sectionF?.id, lastUpdate: new Date('2025-09-14T09:05:00') },
      { trainNumber: '12009', status: 'active', priority: 3, currentSectionId: sectionA?.id, lastUpdate: new Date('2025-09-14T08:55:00') },
      { trainNumber: '12010', status: 'delayed', priority: 2, currentSectionId: sectionB?.id, lastUpdate: new Date('2025-09-14T09:15:00') },
    ],
    skipDuplicates: true,
  });

  // Get trains for timetable/conflicts/logs
  const train1 = await prisma.train.findFirst({ where: { trainNumber: '12001' } });
  const train2 = await prisma.train.findFirst({ where: { trainNumber: '12002' } });
  const train3 = await prisma.train.findFirst({ where: { trainNumber: '12003' } });
  const train6 = await prisma.train.findFirst({ where: { trainNumber: '12006' } });
  const train7 = await prisma.train.findFirst({ where: { trainNumber: '12007' } });
  const train8 = await prisma.train.findFirst({ where: { trainNumber: '12008' } });
  const train9 = await prisma.train.findFirst({ where: { trainNumber: '12009' } });
  const train10 = await prisma.train.findFirst({ where: { trainNumber: '12010' } });

  // 🔹 Timetable
  await prisma.timetable.createMany({
    data: [
      { trainId: train1!.id, sectionId: sectionA!.id, scheduledTime: new Date('2025-09-14T08:30:00'), actualTime: new Date('2025-09-14T08:32:00') },
      { trainId: train2!.id, sectionId: sectionB!.id, scheduledTime: new Date('2025-09-14T08:45:00'), actualTime: new Date('2025-09-14T08:55:00') },
      { trainId: train3!.id, sectionId: sectionC!.id, scheduledTime: new Date('2025-09-14T09:00:00'), actualTime: new Date('2025-09-14T09:02:00') },
      { trainId: train6!.id, sectionId: sectionD!.id, scheduledTime: new Date('2025-09-14T09:10:00') },
      { trainId: train7!.id, sectionId: sectionE!.id, scheduledTime: new Date('2025-09-14T08:20:00'), actualTime: new Date('2025-09-14T08:40:00') },
      { trainId: train8!.id, sectionId: sectionF!.id, scheduledTime: new Date('2025-09-14T09:05:00'), actualTime: new Date('2025-09-14T09:06:00') },
    ],
    skipDuplicates: true,
  });

  // 🔹 Conflicts
  await prisma.conflict.createMany({
    data: [
      {
        train1Id: train1!.id,
        train2Id: train9!.id,
        sectionId: sectionA!.id,
        detectedAt: new Date('2025-09-14T08:40:00'),
        resolutionSuggestion: 'Hold Train 12009 until Train 12001 clears Section A',
        resolved: true,
        resolvedAt: new Date('2025-09-14T08:50:00'),
        resolvedById: 1,
      },
      {
        train1Id: train2!.id,
        train2Id: train10!.id,
        sectionId: sectionB!.id,
        detectedAt: new Date('2025-09-14T09:00:00'),
        resolutionSuggestion: 'Reschedule Train 12010 to 09:20',
        resolved: false,
      },
      {
        train1Id: train6!.id,
        train2Id: train7!.id,
        sectionId: sectionD!.id,
        detectedAt: new Date('2025-09-14T09:05:00'),
        resolutionSuggestion: 'Redirect Train 12006 to alternative section',
        resolved: false,
      },
    ],
  });

  // 🔹 Logs
  await prisma.log.createMany({
    data: [
      { eventType: 'AI suggestion', trainId: train2!.id, description: 'Train 12002 delayed in Section B; suggested reroute.', timestamp: new Date('2025-09-14T08:50:00') },
      { eventType: 'manual override', trainId: train1!.id, userId: 1, description: 'Dispatcher approved Train 12001 priority clearance.', timestamp: new Date('2025-09-14T08:52:00') },
      { eventType: 'conflict detection', trainId: train6!.id, description: 'Conflict detected between Train 12006 and Train 12007.', timestamp: new Date('2025-09-14T09:06:00') },
      { eventType: 'resolution applied', trainId: train9!.id, userId: 1, description: 'Dispatcher resolved Train 12009 delay.', timestamp: new Date('2025-09-14T08:56:00') },
    ],
  });

  // 🔹 Analytics
  await prisma.analytics.createMany({
    data: [
      { metricName: 'on_time_percentage', value: '92.5', recordedAt: new Date('2025-09-14T08:00:00') },
      { metricName: 'delayed_trains', value: '5', recordedAt: new Date('2025-09-14T08:00:00') },
      { metricName: 'conflicts_detected', value: '2', recordedAt: new Date('2025-09-14T08:00:00') },
      { metricName: 'average_delay_minutes', value: '7.3', recordedAt: new Date('2025-09-14T08:00:00') },
      { metricName: 'on_time_percentage', value: '94.1', recordedAt: new Date('2025-09-14T09:00:00') },
      { metricName: 'delayed_trains', value: '3', recordedAt: new Date('2025-09-14T09:00:00') },
      { metricName: 'conflicts_detected', value: '1', recordedAt: new Date('2025-09-14T09:00:00') },
      { metricName: 'average_delay_minutes', value: '5.5', recordedAt: new Date('2025-09-14T09:00:00') },
    ],
  });
}

main()
  .then(() => console.log('✅ Database seeded successfully'))
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
