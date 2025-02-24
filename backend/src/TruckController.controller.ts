import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { TruckRepository } from './TruckRepository.service';
import { Truck } from './types/truck.type';

@Controller('truck')
export class TruckController {
  constructor(private readonly truckRepository: TruckRepository) {}

  @Get()
  listTrucks(): Truck[] {
    return this.truckRepository.getAll();
  }

  @Post()
  saveTruck(@Body() body): Truck {
    return this.truckRepository.save(body)
  }

  @Delete(':id')
  deleteTruck(@Param('id') id: string): void {
    this.truckRepository.delete(id)
  }

  @Put(':id')
  updateTruck(@Body() body): Truck {
    return this.truckRepository.update(body)
  }
}
