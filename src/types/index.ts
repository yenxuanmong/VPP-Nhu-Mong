export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features?: string[];
  tags?: string[];
  size?: 'large' | 'medium' | 'small';
  link?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  badge?: 'hot' | 'sale';
  salePercent?: number;
}

export interface PricingRow {
  format: string;
  weight: string;
  quantity: string;
  price: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface Stat {
  value: string;
  suffix?: string;
  label: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}
