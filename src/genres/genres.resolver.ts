import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenresService } from './Genres.service';
import { lastValueFrom } from 'rxjs';
import { mapId, mapIdInArray } from '../helpers';
import { Genre, GenreInput, DeleteResponse } from '../graphql';

@Resolver('Genre')
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Query('genres')
  async getGenres() {
    const response = await lastValueFrom(this.genresService.findAll());
    return mapIdInArray(response.data.items);
  }

  @Query('genre')
  async getGenre(@Args('id') id: string) {
    const response = await lastValueFrom(this.genresService.findOneById(id));
    return mapId(response.data);
  }

  @Mutation('createGenre')
  async create(@Args('genre') genre: GenreInput): Promise<Genre> {
    const response = await lastValueFrom(this.genresService.createGenre(genre));
    return mapId(response.data);
  }

  @Mutation('updateGenre')
  async update(
    @Args('id') id: string,
    @Args('genre') genre: GenreInput,
  ): Promise<Genre> {
    const response = await lastValueFrom(
      this.genresService.updateGenre(id, genre),
    );
    return mapId(response.data);
  }

  @Mutation('deleteGenre')
  async delete(@Args('id') id: string): Promise<DeleteResponse> {
    const response = await lastValueFrom(this.genresService.deleteGenre(id));
    return response.data;
  }
}
