export type PropertyType = 'Condominium' | 'House and Lot' | 'Rental';

export type Location = 'Cebu' | 'Bohol' | 'Palawan' | 'Davao';

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
