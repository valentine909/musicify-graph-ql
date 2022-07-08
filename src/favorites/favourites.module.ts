import { Module } from '@nestjs/common';
import { FavouritesResolver } from './favourites.resolver';
import { HttpModule } from '@nestjs/axios';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [HttpModule, ServicesModule],
  providers: [FavouritesResolver],
})
export class FavouritesModule {}
