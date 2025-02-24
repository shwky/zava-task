import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2'
import { Parcel } from './types/parcel.type';

@Injectable()
export class ParcelRepository {

  // No need to use a database for this assignment - we'll store the parcels in memory.
  private parcels: Parcel[] = [
    {
      id: 'a',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
      weight: 8.0,
      truckId: null,
      destination: 'London'
    },
    {
      id: 'b',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
      weight: 10.2,
      truckId: null,
      destination: 'Manchester'
    },
    {
      id: 'c',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
      weight: 16.7,
      truckId: null,
      destination: 'Birmingham'
    }
  ]

  getAll(): Parcel[] {
    return this.parcels;
  };

  save(data: Parcel) {
    if (data.weight <= 0) {
      throw new HttpException('Weight must be greater than 0', HttpStatus.BAD_REQUEST);
    }

    const parcel: Parcel = {
      id: createId(),
      createdAt: new Date().toISOString(),
      ...data
    };

    this.parcels.push(parcel);
    return parcel;
  };

  update(data: Partial<Parcel>) {
    if (!data.id) {
      throw new HttpException('id was not provided', HttpStatus.BAD_REQUEST);
    }

    const parcel = this.parcels.find((entry) => entry.id === data.id);
    if (!parcel) {
      throw new HttpException(`No parcel found for id: ${data.id}`, HttpStatus.NOT_FOUND);
    }

    const updatedParcel = {
      ...parcel,
      ...data,
      updatedAt: new Date().toISOString()
    };

    this.parcels = this.parcels.map(p => p.id === data.id ? updatedParcel : p);
    return updatedParcel;
  }

  delete(id: string) {
    const initialLength = this.parcels.length;
    this.parcels = this.parcels.filter((parcel) => parcel.id !== id);
    
    if (this.parcels.length === initialLength) {
      throw new HttpException(`No parcel found with id: ${id}`, HttpStatus.NOT_FOUND);
    }
  }

  getById(id: string): Parcel {
    const parcel = this.parcels.find((p) => p.id === id);
    if (!parcel) {
      throw new HttpException(`No parcel found with id: ${id}`, HttpStatus.NOT_FOUND);
    }
    return parcel;
  }

}
