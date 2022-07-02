import { Module } from '@nestjs/common';
import { GenresResolver } from './Genres.resolver';
import { GenresService } from './Genres.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [GenresResolver, GenresService],
})
export class GenresModule {}
