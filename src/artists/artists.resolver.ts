import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ArtistsService } from '../services/artists.service';
import { lastValueFrom } from 'rxjs';
import { getAuthHeaders, mapBandsId, mapId, mapIdInArray } from '../helpers';
import { Artist, ArtistInput, DeleteResponse } from '../graphql';
import { PaginationSettings } from '../constants';
import { BandsService } from '../services/bands.service';
import { Catch } from '@nestjs/common';

@Catch()
@Resolver('Artist')
export class ArtistsResolver {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
  ) {}

  @Query('artists')
  async getArtists(
    @Args('limit') limit = PaginationSettings.limit,
    @Args('offset') offset = PaginationSettings.offset,
  ) {
    const response = await lastValueFrom(
      this.artistsService.findAll(limit, offset),
    );
    return mapIdInArray(response.data.items);
  }

  @Query('artist')
  async getArtist(@Args('id') id: string) {
    const response = await lastValueFrom(this.artistsService.findOneById(id));
    return mapId(response.data);
  }

  @ResolveField()
  async bands(@Parent() artist) {
    const { bandsIds } = artist;
    return bandsIds.map(async (bandId) => {
      const band = await lastValueFrom(this.bandsService.findOneById(bandId));
      return mapId(band.data);
    });
  }

  @Mutation('createArtist')
  async create(
    @Args('artist') artist: ArtistInput,
    @Context('req') req,
  ): Promise<Artist> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const mappedArtist = mapBandsId(artist);
      const response = await lastValueFrom(
        this.artistsService.createArtist(mappedArtist, config),
      );
      return mapId(response.data);
    }
  }

  @Mutation('updateArtist')
  async update(
    @Args('id') id: string,
    @Args('artist') artist: ArtistInput,
    @Context('req') req,
  ): Promise<Artist> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const mappedArtist = mapBandsId(artist);
      const response = await lastValueFrom(
        this.artistsService.updateArtist(id, mappedArtist, config),
      );
      return mapId(response.data);
    }
  }

  @Mutation('deleteArtist')
  async delete(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const response = await lastValueFrom(
        this.artistsService.deleteArtist(id, config),
      );
      return response.data;
    }
  }
}
