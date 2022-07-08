import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { lastValueFrom } from 'rxjs';
import { mapId } from '../helpers';
import { LoginInput, User, UserInput, JWT } from '../graphql';
import { Catch } from '@nestjs/common';

@Catch()
@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('user')
  async getUser(@Args('id') id: string): Promise<User> {
    const response = await lastValueFrom(this.usersService.getUser(id));
    return mapId(response.data);
  }

  @Query('jwt')
  async getJWT(@Args('login') login: LoginInput): Promise<JWT> {
    const response = await lastValueFrom(this.usersService.getJWT(login));
    return response.data;
  }

  @Mutation('register')
  async create(@Args('user') user: UserInput): Promise<User> {
    const response = await lastValueFrom(this.usersService.register(user));
    return mapId(response.data);
  }
}
