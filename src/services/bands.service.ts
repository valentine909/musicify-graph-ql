import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Microservice, IConfig } from '../constants';
import { BandInput, DeleteResponse } from '../graphql';

@Injectable()
export class BandsService {
  constructor(private readonly http: HttpService) {}

  findAll(limit: number, offset: number): Observable<AxiosResponse<any>> {
    return this.http
      .get(Microservice.bands, {
        params: { limit: limit, offset: offset },
      })
      .pipe(
        catchError(() => {
          throw { message: 'Invalid input' };
        }),
      );
  }

  findOneById(id: string): Observable<AxiosResponse<any>> {
    return this.http.get(`${Microservice.bands}/${id}`).pipe(
      catchError(() => {
        throw { message: 'Invalid input' };
      }),
    );
  }

  createBand(band: BandInput, config: IConfig): Observable<AxiosResponse<any>> {
    return this.http.post(`${Microservice.bands}`, band, config).pipe(
      catchError(() => {
        throw { message: 'Invalid input' };
      }),
    );
  }

  updateBand(
    id: string,
    band: BandInput,
    config: IConfig,
  ): Observable<AxiosResponse<any>> {
    return this.http.put(`${Microservice.bands}/${id}`, band, config).pipe(
      catchError(() => {
        throw { message: 'Invalid input' };
      }),
    );
  }

  deleteBand(
    id: string,
    config: IConfig,
  ): Observable<AxiosResponse<DeleteResponse>> {
    return this.http.delete(`${Microservice.bands}/${id}`, config).pipe(
      catchError(() => {
        throw { message: 'Invalid input' };
      }),
    );
  }
}
