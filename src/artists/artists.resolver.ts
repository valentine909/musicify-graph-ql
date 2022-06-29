import { Query, Resolver } from '@nestjs/graphql';
import { ArtistsService } from './artists.service';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(private readonly artistsService: ArtistsService) {}

  @Query('artists')
  async getArtists() {
    return this.artistsService.findAll();
  }
}
