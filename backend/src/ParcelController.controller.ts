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
}
