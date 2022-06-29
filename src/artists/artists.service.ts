import { Injectable } from '@nestjs/common';
import { Artist } from '../graphql';

@Injectable()
export class ArtistsService {
  private readonly artists: Array<Artist> = [
    { id: 'abc', firstName: 'Cat' },
    { id: 'adfbbc', firstName: 'Human' },
  ];

  findAll(): Artist[] {
    return this.artists;
  }

  create(artist: Artist): Artist {
    artist.id = String(this.artists.length + 1);
    this.artists.push(artist);
    return artist;
  }

  findOneById(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }
}
