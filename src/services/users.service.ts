import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { IConfig, Microservice } from '../constants';
import { User, UserInput, JWT, LoginInput } from '../graphql';

@Injectable()
export class UsersService {
  constructor(private readonly http: HttpService) {}

  register(user: UserInput): Observable<AxiosResponse<User>> {
    return this.http.post(Microservice.resister, user);
  }

  getUser(id: string): Observable<AxiosResponse<number>> {
    return this.http.get(`${Microservice.users}/${id}`);
  }

  getJWT(login: LoginInput): Observable<AxiosResponse<JWT>> {
    return this.http.post(Microservice.login, login);
  }

  async verifyToken(config: IConfig): Promise<void> {
    try {
      await lastValueFrom(this.http.post(Microservice.verify, null, config));
    } catch (err) {
      throw { message: 'Invalid token' };
    }
  }
}
