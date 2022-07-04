import { Module } from '@nestjs/common';
import { ArtistsResolver } from './artists.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [HttpModule, ServicesModule],
  providers: [ArtistsResolver],
})
export class ArtistsModule {}
