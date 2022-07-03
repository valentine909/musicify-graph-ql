import { Module } from '@nestjs/common';
import { BandsResolver } from './bands.resolver';
import { BandsService } from './bands.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [BandsResolver, BandsService],
})
export class BandsModule {}
