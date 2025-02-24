export interface Parcel {
  id: string;
  truckId: string | null;
  weight: number;
  destination: string;
  createdAt: string;
  updatedAt?: string;
} 