import { Module } from '@nestjs/common';
import { BandsResolver } from './bands.resolver';
import { BandsService } from './bands.service';
import { HttpModule } from '@nestjs/axios';
import { ArtistsModule } from '../artists/artists.module';
import { GenresModule } from '../genres/genres.module';

@Module({
  imports: [HttpModule, ArtistsModule, GenresModule],
  providers: [BandsResolver, BandsService],
  exports: [BandsService],
})
export class BandsModule {}
