import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FavouritesService } from '../services/favourites.service';
import { lastValueFrom } from 'rxjs';
import { getAuthHeaders, mapId } from '../helpers';
import { Favourite, FavouriteInput } from '../graphql';
import { BandsService } from '../services/bands.service';
import { Catch } from '@nestjs/common';
import { GenresService } from '../services/genres.service';
import { TracksService } from '../services/tracks.service';
import { ArtistsService } from '../services/artists.service';
import { UsersService } from '../services/users.service';
import { WrongInputError } from '../constants';

@Catch()
@Resolver('Favourite')
export class FavouritesResolver {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly userService: UsersService,
  ) {}

  @Query('favourites')
  async getFavourites(@Context('req') req) {
    const config = getAuthHeaders(req.headers.authorization);
    await this.userService.verifyToken(config);
    const response = await lastValueFrom(
      this.favouritesService.findAll(config),
    );
    return mapId(response.data);
  }

  @ResolveField()
  async user(@Parent() favourite) {
    const { userId } = favourite;
    const response = await lastValueFrom(this.userService.getUser(userId));
    return mapId(response.data);
  }

  @ResolveField()
  async bands(@Parent() favourite) {
    const { bandsIds } = favourite;
    return bandsIds.map(async (bandId) => {
      const band = await lastValueFrom(this.bandsService.findOneById(bandId));
      return mapId(band.data);
    });
  }

  @ResolveField()
  async genres(@Parent() favourite) {
    const { genresIds } = favourite;
    return genresIds.map(async (genresId) => {
      const genre = await lastValueFrom(
        this.genresService.findOneById(genresId),
      );
      return mapId(genre.data);
    });
  }

  @ResolveField()
  async artists(@Parent() favourite) {
    const { artistsIds } = favourite;
    return artistsIds.map(async (artistsId) => {
      const artist = await lastValueFrom(
        this.artistsService.findOneById(artistsId),
      );
      return mapId(artist.data);
    });
  }

  @ResolveField()
  async tracks(@Parent() favourite) {
    const { tracksIds } = favourite;
    return tracksIds.map(async (trackId) => {
      const track = await lastValueFrom(
        this.tracksService.findOneById(trackId),
      );
      return mapId(track.data);
    });
  }

  @Mutation('addArtistToFavourites')
  async addArtist(
    @Args('input') input: FavouriteInput,
    @Context('req') req,
  ): Promise<Favourite> {
    const { type } = input;
    if (type === 'artists') {
      const config = getAuthHeaders(req.headers.authorization);
      const response = await lastValueFrom(
        this.favouritesService.createFavourite(input, config),
      );
      return mapId(response.data);
    } else {
      throw WrongInputError;
    }
  }

  @Mutation('addBandToFavourites')
  async addBand(
    @Args('input') input: FavouriteInput,
    @Context('req') req,
  ): Promise<Favourite> {
    const { type } = input;
    if (type === 'bands') {
      const config = getAuthHeaders(req.headers.authorization);
      const response = await lastValueFrom(
        this.favouritesService.createFavourite(input, config),
      );
      return mapId(response.data);
    } else {
      throw WrongInputError;
    }
  }

  @Mutation('addGenreToFavourites')
  async addGenre(
    @Args('input') input: FavouriteInput,
    @Context('req') req,
  ): Promise<Favourite> {
    const { type } = input;
    if (type === 'genres') {
      const config = getAuthHeaders(req.headers.authorization);
      const response = await lastValueFrom(
        this.favouritesService.createFavourite(input, config),
      );
      return mapId(response.data);
    } else {
      throw WrongInputError;
    }
  }

  @Mutation('addTrackToFavourites')
  async addTrack(
    @Args('input') input: FavouriteInput,
    @Context('req') req,
  ): Promise<Favourite> {
    const { type } = input;
    if (type === 'tracks') {
      const config = getAuthHeaders(req.headers.authorization);
      const response = await lastValueFrom(
        this.favouritesService.createFavourite(input, config),
      );
      return mapId(response.data);
    } else {
      throw WrongInputError;
    }
  }
}
