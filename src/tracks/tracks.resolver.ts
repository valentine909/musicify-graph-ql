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
import {
  getAuthHeaders,
  mapId,
  mapArtistsId,
  mapBandsId,
  mapGenresId,
  mapIdInArray,
  mapAlbumsId,
} from '../helpers';
import { Catch } from '@nestjs/common';
import { Track, TrackInput, DeleteResponse } from '../graphql';
import { PaginationSettings } from '../constants';
import { BandsService } from '../services/bands.service';
import { GenresService } from '../services/genres.service';
import { TracksService } from '../services/tracks.service';
import { ArtistsService } from '../services/artists.service';

@Catch()
@Resolver('Track')
export class TracksResolver {
  constructor(
    private readonly tracksService: TracksService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Query('tracks')
  async getTracks(
    @Args('limit') limit = PaginationSettings.limit,
    @Args('offset') offset = PaginationSettings.offset,
  ) {
    const response = await lastValueFrom(
      this.tracksService.findAll(limit, offset),
    );
    return mapIdInArray(response.data.items);
  }

  @Query('track')
  async getTrack(@Args('id') id: string) {
    const response = await lastValueFrom(this.tracksService.findOneById(id));
    return mapId(response.data);
  }

  @ResolveField()
  async bands(@Parent() track) {
    const { bandsIds } = track;
    return bandsIds.map(async (bandId) => {
      const band = await lastValueFrom(this.bandsService.findOneById(bandId));
      return mapId(band.data);
    });
  }

  @ResolveField()
  async album(@Parent() track) {
    const { albumId } = track;
    const album = await lastValueFrom(this.bandsService.findOneById(albumId));
    return mapId(album.data);
  }

  @ResolveField()
  async genres(@Parent() track) {
    const { genresIds } = track;
    return genresIds.map(async (genresId) => {
      const genre = await lastValueFrom(
        this.genresService.findOneById(genresId),
      );
      return mapId(genre.data);
    });
  }

  @ResolveField()
  async artists(@Parent() track) {
    const { artistsIds } = track;
    return artistsIds.map(async (artistsId) => {
      const artist = await lastValueFrom(
        this.artistsService.findOneById(artistsId),
      );
      return mapId(artist.data);
    });
  }

  @Mutation('createTrack')
  async create(
    @Args('track') track: TrackInput,
    @Context('req') req,
  ): Promise<Track> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const mappedTrack = mapGenresId(
        mapAlbumsId(mapArtistsId(mapBandsId(track))),
      );
      const response = await lastValueFrom(
        this.tracksService.createTrack(mappedTrack, config),
      );
      return mapId(response.data);
    }
  }

  @Mutation('updateTrack')
  async update(
    @Args('id') id: string,
    @Args('track') track: TrackInput,
    @Context('req') req,
  ): Promise<Track> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const mappedTrack = mapGenresId(
        mapAlbumsId(mapArtistsId(mapBandsId(track))),
      );
      const response = await lastValueFrom(
        this.tracksService.updateTrack(id, mappedTrack, config),
      );
      return mapId(response.data);
    }
  }

  @Mutation('deleteTrack')
  async delete(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const response = await lastValueFrom(
        this.tracksService.deleteTrack(id, config),
      );
      return response.data;
    }
  }
}
