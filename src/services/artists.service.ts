import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Microservice, IConfig, WrongInputError } from '../constants';
import { ArtistInput, DeleteResponse } from '../graphql';

@Injectable()
export class ArtistsService {
  constructor(private readonly http: HttpService) {}

  findAll(limit: number, offset: number): Observable<AxiosResponse<any>> {
    return this.http
      .get(Microservice.artists, {
        params: { limit: limit, offset: offset },
      })
      .pipe(
        catchError(() => {
          throw WrongInputError;
        }),
      );
  }

  findOneById(id: string): Observable<AxiosResponse<any>> {
    return this.http.get(`${Microservice.artists}/${id}`).pipe(
      catchError(() => {
        throw WrongInputError;
      }),
    );
  }

  createArtist(
    artist: ArtistInput,
    config: IConfig,
  ): Observable<AxiosResponse<any>> {
    return this.http.post(`${Microservice.artists}`, artist, config).pipe(
      catchError(() => {
        throw WrongInputError;
      }),
    );
  }

  updateArtist(
    id: string,
    artist: ArtistInput,
    config: IConfig,
  ): Observable<AxiosResponse<any>> {
    return this.http.put(`${Microservice.artists}/${id}`, artist, config).pipe(
      catchError(() => {
        throw WrongInputError;
      }),
    );
  }

  deleteArtist(
    id: string,
    config: IConfig,
  ): Observable<AxiosResponse<DeleteResponse>> {
    return this.http.delete(`${Microservice.artists}/${id}`, config).pipe(
      catchError(() => {
        throw WrongInputError;
      }),
    );
  }
}
