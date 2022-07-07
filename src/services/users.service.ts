import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IConfig, Microservice } from '../constants';
import { User, UserInput, JWT, LoginInput } from '../graphql';

@Injectable()
export class UsersService {
  constructor(private readonly http: HttpService) {}

  register(user: UserInput): Observable<AxiosResponse<User>> {
    return this.http.post(Microservice.resister, user).pipe(
      catchError(() => {
        throw { message: 'Invalid input' };
      }),
    );
  }

  getUser(id: string): Observable<AxiosResponse<User>> {
    return this.http.get(`${Microservice.users}/${id}`).pipe(
      catchError(() => {
        throw { message: 'Invalid input' };
      }),
    );
  }

  getJWT(login: LoginInput): Observable<AxiosResponse<JWT>> {
    return this.http.post(Microservice.login, login).pipe(
      catchError(() => {
        throw { message: 'Invalid input' };
      }),
    );
  }

  async verifyToken(config: IConfig): Promise<void> {
    try {
      await lastValueFrom(this.http.post(Microservice.verify, null, config));
    } catch (err) {
      throw { message: 'Invalid token' };
    }
  }
}
