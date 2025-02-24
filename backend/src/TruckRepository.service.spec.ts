import { Test, TestingModule } from '@nestjs/testing';
import { TruckRepository } from './TruckRepository.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Truck } from './types/truck.type';

describe('TruckRepository', () => {
  let repository: TruckRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TruckRepository],
    }).compile();

    repository = module.get<TruckRepository>(TruckRepository);
  });

  describe('getAll', () => {
    it('should return all trucks', () => {
      const trucks = repository.getAll();
      expect(trucks).toHaveLength(3);
      expect(trucks[0].id).toBe('1');
    });
  });

  describe('save', () => {
    it('should save a new truck', () => {
      const newTruck: Truck = { id: '4', registration: 'JKL012', createdAt: '2025-01-01', updatedAt: '2025-01-01' };
      const savedTruck = repository.save(newTruck);
      
      expect(savedTruck.id).toBe('4');
      expect(savedTruck.createdAt).toBeDefined();
      expect(savedTruck.updatedAt).toBeDefined();
      
      const allTrucks = repository.getAll();
      expect(allTrucks).toHaveLength(4);
    });

    it('should throw error if id is not provided', () => {
      expect(() => repository.save({} as any)).toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update an existing truck', () => {
      const updateData: Partial<Truck> = { id: '1', registration: 'updated' };
      const updatedTruck = repository.update(updateData);
      
      expect(updatedTruck.id).toBe('1');
      expect(updatedTruck.registration).toBe('updated');
      expect(updatedTruck.updatedAt).toBeDefined();
    });

    it('should throw error if truck not found', () => {
      expect(() => repository.update({ id: 'nonexistent' }))
        .toThrow(new HttpException('No entry found for id: nonexistent', HttpStatus.NOT_FOUND));
    });
  });

  describe('delete', () => {
    it('should delete an existing truck', () => {
      repository.delete('1');
      const trucks = repository.getAll();
      expect(trucks).toHaveLength(2);
      expect(trucks.find(t => t.id === '1')).toBeUndefined();
    });

    it('should throw error if truck not found', () => {
      expect(() => repository.delete('nonexistent'))
        .toThrow(HttpException);
    });
  });
}); 