import { Module } from '@nestjs/common';
import { ArtistsResolver } from './artists.resolver';

@Module({
  providers: [ArtistsResolver],
})
export class ArtistsModule {}
