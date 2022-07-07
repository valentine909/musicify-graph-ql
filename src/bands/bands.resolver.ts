import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { getAuthHeaders, mapGenresId, mapId, mapIdInArray } from '../helpers';
import { Band, BandInput, DeleteResponse } from '../graphql';
import { PaginationSettings } from '../constants';
import { BandsService } from '../services/bands.service';
import { ArtistsService } from '../services/artists.service';
import { GenresService } from '../services/genres.service';
import { Catch } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Catch()
@Resolver('Band')
export class BandsResolver {
  constructor(
    private readonly bandsService: BandsService,
    private readonly artistsService: ArtistsService,
    private readonly genresService: GenresService,
    private readonly userService: UsersService,
  ) {}

  @Query('bands')
  async getBands(
    @Args('limit') limit = PaginationSettings.limit,
    @Args('offset') offset = PaginationSettings.offset,
  ) {
    const response = await lastValueFrom(
      this.bandsService.findAll(limit, offset),
    );
    return mapIdInArray(response.data.items);
  }

  @Query('band')
  async getBand(@Args('id') id: string) {
    const response = await lastValueFrom(this.bandsService.findOneById(id));
    return mapId(response.data);
  }

  @ResolveField()
  async members(@Parent() band) {
    const { members } = band;
    return members.map(async (member) => {
      const rawArtist = await lastValueFrom(
        this.artistsService.findOneById(member.artist),
      );
      const artist = mapId(rawArtist.data);
      return { ...member, artist };
    });
  }

  @ResolveField()
  async genres(@Parent() band) {
    const { genresIds } = band;
    return genresIds.map(async (genreId) => {
      const genre = await lastValueFrom(
        this.genresService.findOneById(genreId),
      );
      return mapId(genre.data);
    });
  }

  @Mutation('createBand')
  async create(
    @Args('band') band: BandInput,
    @Context('req') req,
  ): Promise<Band> {
    const config = getAuthHeaders(req.headers.authorization);
    await this.userService.verifyToken(config);
    const mappedBand = mapGenresId(band);
    const response = await lastValueFrom(
      this.bandsService.createBand(mappedBand, config),
    );
    return mapId(response.data);
  }

  @Mutation('updateBand')
  async update(
    @Args('id') id: string,
    @Args('band') band: BandInput,
    @Context('req') req,
  ): Promise<Band> {
    const config = getAuthHeaders(req.headers.authorization);
    await this.userService.verifyToken(config);
    const mappedBand = mapGenresId(band);
    const response = await lastValueFrom(
      this.bandsService.updateBand(id, mappedBand, config),
    );
    return mapId(response.data);
  }

  @Mutation('deleteBand')
  async delete(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    const config = getAuthHeaders(req.headers.authorization);
    await this.userService.verifyToken(config);
    const response = await lastValueFrom(
      this.bandsService.deleteBand(id, config),
    );
    return response.data;
  }
}
