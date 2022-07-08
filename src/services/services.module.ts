import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ArtistsService } from './artists.service';
import { BandsService } from './bands.service';
import { GenresService } from './genres.service';
import { UsersService } from './users.service';
import { AlbumsService } from './albums.service';
import { TracksService } from './tracks.service';
import { FavouritesService } from './favourites.service';

@Module({
  imports: [HttpModule],
  providers: [
    ArtistsService,
    BandsService,
    GenresService,
    UsersService,
    AlbumsService,
    TracksService,
    FavouritesService,
  ],
  exports: [
    ArtistsService,
    BandsService,
    GenresService,
    UsersService,
    AlbumsService,
    TracksService,
    FavouritesService,
  ],
})
export class ServicesModule {}
