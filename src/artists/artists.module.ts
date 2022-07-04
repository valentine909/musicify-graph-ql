import { Module } from '@nestjs/common';
import { ArtistsResolver } from './artists.resolver';
import { ArtistsService } from './artists.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ArtistsResolver, ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
