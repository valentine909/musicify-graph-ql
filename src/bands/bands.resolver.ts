import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { lastValueFrom } from 'rxjs';
import { mapGenresId, mapId, mapIdInArray } from '../helpers';
import { Band, BandInput, DeleteResponse } from '../graphql';
import { PaginationSettings } from '../constants';
import { BandsService } from '../services/bands.service';
import { ArtistsService } from '../services/artists.service';
import { GenresService } from '../services/genres.service';

@Resolver('Band')
export class BandsResolver {
  constructor(
    private readonly bandsService: BandsService,
    private readonly artistsService: ArtistsService,
    private readonly genresService: GenresService,
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
  async create(@Args('band') band: BandInput): Promise<Band> {
    const mappedBand = mapGenresId(band);
    const response = await lastValueFrom(
      this.bandsService.createBand(mappedBand),
    );
    return mapId(response.data);
  }

  @Mutation('updateBand')
  async update(
    @Args('id') id: string,
    @Args('band') band: BandInput,
  ): Promise<Band> {
    const mappedBand = mapGenresId(band);
    const response = await lastValueFrom(
      this.bandsService.updateBand(id, mappedBand),
    );
    return mapId(response.data);
  }

  @Mutation('deleteBand')
  async delete(@Args('id') id: string): Promise<DeleteResponse> {
    const response = await lastValueFrom(this.bandsService.deleteBand(id));
    return response.data;
  }
}
