import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Microservice, Config } from '../constants';
import { GenreInput, DeleteResponse } from '../graphql';

@Injectable()
export class GenresService {
  constructor(private readonly http: HttpService) {}

  findAll(): Observable<AxiosResponse<any>> {
    return this.http.get(Microservice.genres);
  }

  findOneById(id: string): Observable<AxiosResponse<any>> {
    return this.http.get(`${Microservice.genres}/${id}`);
  }

  createGenre(Genre: GenreInput): Observable<AxiosResponse<any>> {
    return this.http.post(`${Microservice.genres}`, Genre, Config);
  }

  updateGenre(id: string, genre: GenreInput): Observable<AxiosResponse<any>> {
    return this.http.put(`${Microservice.genres}/${id}`, genre, Config);
  }

  deleteGenre(id: string): Observable<AxiosResponse<DeleteResponse>> {
    return this.http.delete(`${Microservice.genres}/${id}`, Config);
  }
}
