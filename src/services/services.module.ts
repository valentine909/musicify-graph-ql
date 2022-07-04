import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ArtistsService } from './artists.service';
import { BandsService } from './bands.service';
import { GenresService } from './genres.service';
import { UsersService } from './users.service';

@Module({
  imports: [HttpModule],
  providers: [ArtistsService, BandsService, GenresService, UsersService],
  exports: [ArtistsService, BandsService, GenresService, UsersService],
})
export class ServicesModule {}
