export interface TestKit {
  id: string;
  name: string;
  type: 'ORAL_SALIVA' | 'FINGER_PRICK' | 'COMBO_ANTIGEN';
  sampleType: 'ORAL' | 'BLOOD' | 'BOTH';
  minPriceETB: number;
  maxPriceETB: number;
}

export interface PharmacyKit {
  id: string;
  kit: TestKit;
  kitId: string;
  pharmacyId: string;
  inStock: boolean;
  stockLevel: 'AVAILABLE' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  priceETB: number;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  isOpen: boolean;
  hoursJson: Record<string, string> | null;
  distanceKm?: number;
  testKits?: PharmacyKit[];
}

export interface EducationModule {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  order: number;
  sections?: Section[];
}

export interface Section {
  id: string;
  order: number;
  title: string;
  body: string;
  mediaUrl: string | null;
}
