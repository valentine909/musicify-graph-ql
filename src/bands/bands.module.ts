import { Module } from '@nestjs/common';
import { BandsResolver } from './bands.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [HttpModule, ServicesModule],
  providers: [BandsResolver],
})
export class BandsModule {}
