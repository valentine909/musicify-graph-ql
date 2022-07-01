import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';
import { lastValueFrom } from 'rxjs';
import { mapId, mapIdInArray } from '../helpers';
import { Artist } from '../graphql';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Query('artists')
  async getArtists() {
    const response = await lastValueFrom(this.artistsService.findAll());
    return mapIdInArray(response.data.items);
  }

  @Query('artist')
  async getArtist(@Args('id') id: string) {
    const response = await lastValueFrom(this.artistsService.findOneById(id));
    return mapId(response.data);
  }

  @Mutation('createArtist')
  async create(@Args('artist') artist: Artist): Promise<Artist> {
    const response = await lastValueFrom(
      this.artistsService.createArtist(artist),
    );
    return mapId(response.data);
  }
}
