import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AlbumsService } from '../services/albums.service';
import { lastValueFrom } from 'rxjs';
import {
  getAuthHeaders,
  mapArtistsId,
  mapBandsId,
  mapGenresId,
  mapId,
  mapIdInArray,
  mapTracksId,
} from '../helpers';
import { Album, AlbumInput, DeleteResponse } from '../graphql';
import { PaginationSettings } from '../constants';
import { BandsService } from '../services/bands.service';
import { Catch } from '@nestjs/common';
import { GenresService } from '../services/genres.service';
import { TracksService } from '../services/tracks.service';
import { ArtistsService } from '../services/artists.service';

@Catch()
@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Query('albums')
  async getAlbums(
    @Args('limit') limit = PaginationSettings.limit,
    @Args('offset') offset = PaginationSettings.offset,
  ) {
    const response = await lastValueFrom(
      this.albumsService.findAll(limit, offset),
    );
    return mapIdInArray(response.data.items);
  }

  @Query('album')
  async getAlbum(@Args('id') id: string) {
    const response = await lastValueFrom(this.albumsService.findOneById(id));
    return mapId(response.data);
  }

  @ResolveField()
  async bands(@Parent() album) {
    const { bandsIds } = album;
    return bandsIds.map(async (bandId) => {
      const band = await lastValueFrom(this.bandsService.findOneById(bandId));
      return mapId(band.data);
    });
  }

  @ResolveField()
  async genres(@Parent() album) {
    const { genresIds } = album;
    return genresIds.map(async (genresId) => {
      const genre = await lastValueFrom(
        this.genresService.findOneById(genresId),
      );
      return mapId(genre.data);
    });
  }

  @ResolveField()
  async artists(@Parent() album) {
    const { artistsIds } = album;
    return artistsIds.map(async (artistsId) => {
      const artist = await lastValueFrom(
        this.artistsService.findOneById(artistsId),
      );
      return mapId(artist.data);
    });
  }

  @ResolveField()
  async tracks(@Parent() album) {
    const { trackIds } = album;
    return trackIds.map(async (trackId) => {
      const track = await lastValueFrom(
        this.tracksService.findOneById(trackId),
      );
      return mapId(track.data);
    });
  }

  @Mutation('createAlbum')
  async create(
    @Args('album') album: AlbumInput,
    @Context('req') req,
  ): Promise<Album> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const mappedAlbum = mapGenresId(
        mapTracksId(mapArtistsId(mapBandsId(album))),
      );
      const response = await lastValueFrom(
        this.albumsService.createAlbum(mappedAlbum, config),
      );
      return mapId(response.data);
    }
  }

  @Mutation('updateAlbum')
  async update(
    @Args('id') id: string,
    @Args('album') album: AlbumInput,
    @Context('req') req,
  ): Promise<Album> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const mappedAlbum = mapGenresId(
        mapTracksId(mapArtistsId(mapBandsId(album))),
      );
      const response = await lastValueFrom(
        this.albumsService.updateAlbum(id, mappedAlbum, config),
      );
      return mapId(response.data);
    }
  }

  @Mutation('deleteAlbum')
  async delete(
    @Args('id') id: string,
    @Context('req') req,
  ): Promise<DeleteResponse> {
    if (req.headers.authorization) {
      const config = getAuthHeaders(req.headers.authorization);
      const response = await lastValueFrom(
        this.albumsService.deleteAlbum(id, config),
      );
      return response.data;
    }
  }
}
