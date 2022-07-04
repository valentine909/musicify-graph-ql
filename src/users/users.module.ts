import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [HttpModule, ServicesModule],
  providers: [UsersResolver],
})
export class UsersModule {}
