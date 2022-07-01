import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { lastValueFrom } from 'rxjs';
import { mapId } from '../helpers';
import { LoginInput, User, UserInput, JWT } from '../graphql';
import { UserData } from '../constants';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('user')
  async getUser(@Args('id') id: string): Promise<number> {
    const response = await lastValueFrom(this.usersService.getUser(id));
    return response.status;
  }

  @Query('jwt')
  async getJWT(@Args('login') login: LoginInput): Promise<JWT> {
    const response = await lastValueFrom(this.usersService.getJWT(login));
    UserData.jwt = response.data.jwt;
    return response.data;
  }

  @Mutation('register')
  async create(@Args('user') user: UserInput): Promise<User> {
    const response = await lastValueFrom(this.usersService.register(user));
    return mapId(response.data);
  }
}