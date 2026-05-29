export type ActiveTab = 'home' | 'intro' | 'sprayer' | 'pump' | 'assembly' | 'order';

export interface Product {
  id: string;
  name: string;
  category: 'sprayer' | 'pump';
  image: string;
  modelName: string;
  pressure: string; // 압력 (MPa 또는 kgf/cm2)
  flowRate: string; // 흡수량 (L/min)
  power: string; // 소요동력 (HP/PS 또는 kW)
  rpm: string; // 회전수 (RPM)
  weight: string; // 중량 (kg)
  features: string[];
  description: string;
}

export interface Inquiry {
  name: string;
  phone: string;
  category: string;
  message: string;
  createdAt: string;
}
