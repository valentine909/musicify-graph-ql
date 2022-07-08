import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Microservice, IConfig, WrongInputError } from '../constants';
import { FavouriteInput } from '../graphql';

@Injectable()
export class FavouritesService {
  constructor(private readonly http: HttpService) {}

  findAll(config: IConfig): Observable<AxiosResponse<any>> {
    return this.http.get(Microservice.favourites, config).pipe(
      catchError(() => {
        throw WrongInputError;
      }),
    );
  }

  createFavourite(
    favourite: FavouriteInput,
    config: IConfig,
  ): Observable<AxiosResponse<any>> {
    return this.http
      .put(`${Microservice.favouritesAdd}`, favourite, config)
      .pipe(
        catchError(() => {
          throw WrongInputError;
        }),
      );
  }
}
