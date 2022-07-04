import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArtistsService } from '../services/artists.service';
import { lastValueFrom } from 'rxjs';
import { mapId, mapIdInArray } from '../helpers';
import { Artist, ArtistInput, DeleteResponse } from '../graphql';
import { PaginationSettings } from '../constants';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

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

  @Mutation('createArtist')
  async create(@Args('artist') artist: ArtistInput): Promise<Artist> {
    const response = await lastValueFrom(
      this.artistsService.createArtist(artist),
    );
    return mapId(response.data);
  }

  @Mutation('updateArtist')
  async update(
    @Args('id') id: string,
    @Args('artist') artist: ArtistInput,
  ): Promise<Artist> {
    const response = await lastValueFrom(
      this.artistsService.updateArtist(id, artist),
    );
    return mapId(response.data);
  }

  @Mutation('deleteArtist')
  async delete(@Args('id') id: string): Promise<DeleteResponse> {
    const response = await lastValueFrom(this.artistsService.deleteArtist(id));
    return response.data;
  }
}
