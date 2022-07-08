import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Microservice, IConfig, WrongInputError } from '../constants';
import { TrackInput, DeleteResponse } from '../graphql';

@Injectable()
export class TracksService {
  constructor(private readonly http: HttpService) {}

  findAll(limit: number, offset: number): Observable<AxiosResponse<any>> {
    return this.http
      .get(Microservice.tracks, {
        params: { limit: limit, offset: offset },
      })
      .pipe(
        catchError(() => {
          throw WrongInputError;
        }),
      );
  }

  findOneById(id: string): Observable<AxiosResponse<any>> {
    return this.http.get(`${Microservice.tracks}/${id}`).pipe(
      catchError(() => {
        throw WrongInputError;
      }),
    );
  }

  createTrack(
    track: TrackInput,
    config: IConfig,
  ): Observable<AxiosResponse<any>> {
    return this.http.post(`${Microservice.tracks}`, track, config).pipe(
      catchError(() => {
        throw WrongInputError;
      }),
    );
  }

  updateTrack(
    id: string,
    track: TrackInput,
    config: IConfig,
  ): Observable<AxiosResponse<any>> {
    return this.http.put(`${Microservice.tracks}/${id}`, track, config).pipe(
      catchError(() => {
        throw WrongInputError;
      }),
    );
  }

  deleteTrack(
    id: string,
    config: IConfig,
  ): Observable<AxiosResponse<DeleteResponse>> {
    return this.http.delete(`${Microservice.tracks}/${id}`, config).pipe(
      catchError(() => {
        throw WrongInputError;
      }),
    );
  }
}
