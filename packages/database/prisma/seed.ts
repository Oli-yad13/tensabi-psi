import { PrismaClient, KitType, SampleType, StockLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Test kits
  const oral = await prisma.testKit.upsert({
    where: { id: 'kit-oral' },
    update: {},
    create: {
      id: 'kit-oral',
      name: 'HIV Oral Self-Test',
      type: KitType.ORAL_SALIVA,
      sampleType: SampleType.ORAL,
      minPriceETB: 650,
      maxPriceETB: 650,
    },
  });

  const finger = await prisma.testKit.upsert({
    where: { id: 'kit-finger' },
    update: {},
    create: {
      id: 'kit-finger',
      name: 'Finger-Prick Test',
      type: KitType.FINGER_PRICK,
      sampleType: SampleType.BLOOD,
      minPriceETB: 650,
      maxPriceETB: 650,
    },
  });

  const combo = await prisma.testKit.upsert({
    where: { id: 'kit-combo' },
    update: {},
    create: {
      id: 'kit-combo',
      name: 'Combo Antigen Test',
      type: KitType.COMBO_ANTIGEN,
      sampleType: SampleType.BLOOD,
      minPriceETB: 650,
      maxPriceETB: 650,
    },
  });

  // Pharmacies (Addis Ababa)
  const selamPharmacy = await prisma.pharmacy.upsert({
    where: { id: 'ph-selam' },
    update: {},
    create: {
      id: 'ph-selam',
      name: 'Selam Pharmacy',
      address: 'Bole Road, Near Edna Mall',
      city: 'Addis Ababa',
      latitude: 9.0107,
      longitude: 38.7612,
      phone: '+251 911 234 567',
      isOpen: true,
      hoursJson: {
        'Mon - Fri': '8:00 AM – 9:00 PM',
        Saturday: '9:00 AM – 7:00 PM',
        Sunday: '10:00 AM – 5:00 PM',
      },
    },
  });

  const kidusPharmacy = await prisma.pharmacy.upsert({
    where: { id: 'ph-kidus' },
    update: {},
    create: {
      id: 'ph-kidus',
      name: 'Kidus Health Pharmacy',
      address: 'Kazanchis, Addis Ababa',
      city: 'Addis Ababa',
      latitude: 9.0243,
      longitude: 38.7562,
      isOpen: true,
      hoursJson: {
        'Mon - Sat': '8:00 AM – 8:00 PM',
        Sunday: 'Closed',
      },
    },
  });

  const medhanitPharmacy = await prisma.pharmacy.upsert({
    where: { id: 'ph-medhani' },
    update: {},
    create: {
      id: 'ph-medhani',
      name: 'Medhani Pharmacy',
      address: 'Piassa, Addis Ababa',
      city: 'Addis Ababa',
      latitude: 9.0348,
      longitude: 38.7468,
      isOpen: false,
      hoursJson: {
        'Mon - Fri': '9:00 AM – 6:00 PM',
        Saturday: '9:00 AM – 3:00 PM',
        Sunday: 'Closed',
      },
    },
  });

  // Pharmacy-kit links
  await prisma.pharmacyKit.upsert({
    where: { pharmacyId_kitId: { pharmacyId: selamPharmacy.id, kitId: oral.id } },
    update: {},
    create: { pharmacyId: selamPharmacy.id, kitId: oral.id, priceETB: 650, stockLevel: StockLevel.AVAILABLE, inStock: true },
  });
  await prisma.pharmacyKit.upsert({
    where: { pharmacyId_kitId: { pharmacyId: selamPharmacy.id, kitId: finger.id } },
    update: {},
    create: { pharmacyId: selamPharmacy.id, kitId: finger.id, priceETB: 650, stockLevel: StockLevel.AVAILABLE, inStock: true },
  });
  await prisma.pharmacyKit.upsert({
    where: { pharmacyId_kitId: { pharmacyId: selamPharmacy.id, kitId: combo.id } },
    update: {},
    create: { pharmacyId: selamPharmacy.id, kitId: combo.id, priceETB: 650, stockLevel: StockLevel.LOW_STOCK, inStock: true },
  });
  await prisma.pharmacyKit.upsert({
    where: { pharmacyId_kitId: { pharmacyId: kidusPharmacy.id, kitId: oral.id } },
    update: {},
    create: { pharmacyId: kidusPharmacy.id, kitId: oral.id, priceETB: 650, stockLevel: StockLevel.AVAILABLE, inStock: true },
  });

  // Education modules
  await prisma.educationModule.upsert({
    where: { slug: 'how-hiv-self-testing-works' },
    update: {},
    create: {
      slug: 'how-hiv-self-testing-works',
      title: 'How HIV Self-Testing Works',
      description: 'Understand the science, accuracy, and what results mean for you.',
      order: 1,
      sections: {
        create: [
          { order: 1, title: 'What is an HIV Self-Test?', body: 'A rapid diagnostic test you can do privately at home. Collect saliva or a drop of blood and get a result in 20–30 minutes.' },
          { order: 2, title: 'Types of Tests', body: 'Oral (Saliva): Swab upper and lower gums. Blood: Use a lancet on your fingertip side.' },
          { order: 3, title: 'Accuracy', body: 'HIV self-tests are over 99% accurate when used correctly. A positive self-test is not a diagnosis — confirm with a healthcare professional.' },
          { order: 4, title: 'Window Period', body: 'Antibodies may take weeks to appear after infection. If recently exposed, wait at least 3 months before testing.' },
        ],
      },
    },
  });

  await prisma.educationModule.upsert({
    where: { slug: 'how-to-use-a-test-kit' },
    update: {},
    create: {
      slug: 'how-to-use-a-test-kit',
      title: 'How to Use a Test Kit',
      description: 'Follow these steps for an accurate result.',
      order: 2,
      sections: {
        create: [
          { order: 1, title: 'Prepare the Test', body: 'Wash hands for 20 seconds. Lay all components on a clean, dry surface. Check the expiry date. Do not eat or drink 30 min before an oral test.' },
          { order: 2, title: 'Collect Your Sample', body: 'Oral: swab upper and lower gums. Blood: use lancet on fingertip side.' },
          { order: 3, title: 'Wait 20–30 Minutes', body: 'Lay test flat and set a timer. Do not read results before or after this window. Reading too early or late gives incorrect results.' },
        ],
      },
    },
  });

  console.log('Seed complete ✓');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
