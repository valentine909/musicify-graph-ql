import { Module } from '@nestjs/common';
import { GenresResolver } from './Genres.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [HttpModule, ServicesModule],
  providers: [GenresResolver],
})
export class GenresModule {}
