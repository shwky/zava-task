import { Controller, Get, Post, Put, Body, Delete, Param } from '@nestjs/common';
import { ParcelRepository } from './ParcelRepository.service';
import { Parcel } from './types/parcel.type';

@Controller('parcel')
export class ParcelController {
  constructor(private readonly parcelRepository: ParcelRepository) {}

  @Get()
  listParcels(): Parcel[] {
    return this.parcelRepository.getAll();
  }

  @Post()
  saveParcel(@Body() body): Parcel {
    return this.parcelRepository.save(body)
  }

  @Delete(':id')
  deleteParcel(@Param('id') id: string): void {
    this.parcelRepository.delete(id)
  }

  @Put(':id')
  updateParcel(@Body() body): Parcel {
    return this.parcelRepository.update(body)
  }

  @Put(':id/truck-load/:truckId')
  async assignTruck(
    @Param('id') id: string,
    @Param('truckId') truckId: string
  ): Promise<Parcel>  {
    return this.parcelRepository.update({id,truckId});
  }

  @Put(':id/truck-unload/')
  async unassignTruck(
    @Param('id') id: string,
  ): Promise<Parcel>  {
    return this.parcelRepository.update({id,truckId:null});
  }


}

