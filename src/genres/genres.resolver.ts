import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenresService } from '../services/genres.service';
import { lastValueFrom } from 'rxjs';
import { getAuthHeaders, mapId, mapIdInArray } from '../helpers';
import { Genre, GenreInput, DeleteResponse } from '../graphql';
import { PaginationSettings } from '../constants';
import { Catch } from '@nestjs/common';

@Catch()
@Resolver('Genre')
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Query('genres')
  async getGenres(
    @Args('limit') limit = PaginationSettings.limit,
    @Args('offset') offset = PaginationSettings.offset,
  ) {
    const response = await lastValueFrom(
      this.genresService.findAll(limit, offset),
    );
    return mapIdInArray(response.data.items);
  }

  @Query('genre')
  async getGenre(@Args('id') id: string) {
    const response = await lastValueFrom(this.genresService.findOneById(id));
    return mapId(response.data);
  }

  @Mutation('createGenre')
  async create(
    @Args('genre') genre: GenreInput,
    @Context('req') req,
  ): Promise<Genre> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const response = await lastValueFrom(
        this.genresService.createGenre(genre, config),
      );
      return mapId(response.data);
    }
  }

  @Mutation('updateGenre')
  async update(
    @Args('id') id: string,
    @Args('genre') genre: GenreInput,
    @Context('req') req,
  ): Promise<Genre> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const response = await lastValueFrom(
        this.genresService.updateGenre(id, genre, config),
      );
      return mapId(response.data);
    }
  }

  @Mutation('deleteGenre')
  async delete(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const response = await lastValueFrom(
        this.genresService.deleteGenre(id, config),
      );
      return response.data;
    }
  }
}
