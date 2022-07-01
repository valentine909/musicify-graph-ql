import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Microservice, UserData } from '../constants';
import { ArtistInput } from '../graphql';

@Injectable()
export class ArtistsService {
  constructor(private readonly http: HttpService) {}

  findAll(): Observable<AxiosResponse<any>> {
    return this.http.get(Microservice.artists);
  }

  findOneById(id: string): Observable<AxiosResponse<any>> {
    return this.http.get(`${Microservice.artists}/${id}`);
  }

  createArtist(artist: ArtistInput): Observable<AxiosResponse<any>> {
    return this.http.post(`${Microservice.artists}`, artist, {
      headers: { Authorization: `Bearer ${UserData.jwt}` },
    });
  }

  updateArtist(
    id: string,
    artist: ArtistInput,
  ): Observable<AxiosResponse<any>> {
    return this.http.put(`${Microservice.artists}/${id}`, artist, {
      headers: { Authorization: `Bearer ${UserData.jwt}` },
    });
  }
}
