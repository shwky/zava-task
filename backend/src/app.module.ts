import { Module } from '@nestjs/common';
import { TruckController } from './TruckController.controller';
import { TruckRepository } from './TruckRepository.service';
import { ParcelController } from './ParcelController.controller';
import { ParcelRepository } from './ParcelRepository.service';  

@Module({
  imports: [],
  controllers: [TruckController, ParcelController],
  providers: [TruckRepository, ParcelRepository],
})
export class AppModule {}
