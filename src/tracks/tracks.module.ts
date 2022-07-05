import { Module } from '@nestjs/common';
import { TracksResolver } from './tracks.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [HttpModule, ServicesModule],
  providers: [TracksResolver],
})
export class TracksModule {}
