import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Microservice, Config } from '../constants';
import { BandInput, DeleteResponse } from '../graphql';

@Injectable()
export class BandsService {
  constructor(private readonly http: HttpService) {}

  findAll(limit: number, offset: number): Observable<AxiosResponse<any>> {
    return this.http.get(Microservice.bands, {
      params: { limit: limit, offset: offset },
    });
  }

  findOneById(id: string): Observable<AxiosResponse<any>> {
    return this.http.get(`${Microservice.bands}/${id}`);
  }

  createBand(band: BandInput): Observable<AxiosResponse<any>> {
    return this.http.post(`${Microservice.bands}`, band, Config);
  }

  updateBand(id: string, band: BandInput): Observable<AxiosResponse<any>> {
    return this.http.put(`${Microservice.bands}/${id}`, band, Config);
  }

  deleteBand(id: string): Observable<AxiosResponse<DeleteResponse>> {
    return this.http.delete(`${Microservice.bands}/${id}`, Config);
  }
}
