export type PropertyType = 'Condominium' | 'House and Lot' | 'Lot-only' | 'Office Space';

export type Location = 'Cebu' | 'Manila' | 'Palawan' | 'Boracay' | 'Davao' | 'Baguio' | 'Iloilo';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  location: Location;
  price: number;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  features: string[];
  images: string[];
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  email: string;
  phone: string;
}
