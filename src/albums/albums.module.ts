import { Module } from '@nestjs/common';
import { AlbumsResolver } from './albums.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [HttpModule, ServicesModule],
  providers: [AlbumsResolver],
})
export class AlbumsModule {}
