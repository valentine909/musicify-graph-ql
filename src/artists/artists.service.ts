import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Microservice } from '../constants';

@Injectable()
export class ArtistsService {
  constructor(private readonly http: HttpService) {}

  findAll(): Observable<AxiosResponse<any>> {
    return this.http.get(Microservice.artists);
  }

  findOneById(id: string): Observable<AxiosResponse<any>> {
    return this.http.get(`${Microservice.artists}/${id}`);
  }
}
