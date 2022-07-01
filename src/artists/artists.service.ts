import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Microservice, Config } from '../constants';
import { ArtistInput, DeleteResponse } from '../graphql';

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
    return this.http.post(`${Microservice.artists}`, artist, Config);
  }

  updateArtist(
    id: string,
    artist: ArtistInput,
  ): Observable<AxiosResponse<any>> {
    return this.http.put(`${Microservice.artists}/${id}`, artist, Config);
  }

  deleteArtist(id: string): Observable<AxiosResponse<DeleteResponse>> {
    return this.http.delete(`${Microservice.artists}/${id}`, Config);
  }
}
