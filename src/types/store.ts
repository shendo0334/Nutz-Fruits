export interface Store {
  id: string;
  slug: string;
  name: string;
  citySlug: string;
  cityName: string;
  state: string;
  area: string;
  address: string;
  pincode: string;
  landmark?: string;
  timings: string;
  days: string;
  phone: string;
  whatsapp?: string;
  email: string;
  mapUrl: string;
  features: string[];
  image: string;
  rating: {
    average: number;
    count: number;
  };
  isFlagship?: boolean;
}

export interface CityInfo {
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  storeCount: number;
  heroImage: string;
}
