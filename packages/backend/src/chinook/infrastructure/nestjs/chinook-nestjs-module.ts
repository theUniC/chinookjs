import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../../domain/artist';
import { TypeormArtistRepository } from '../persistence/typeorm-artist-repository';
import { CreateArtistCommandHandler } from '../../application/command/create-artist/create-artist-command-handler';
import { GetAllArtistsQueryHandler } from '../../application/query/get-all-artists/get-all-artists-query-handler';
import { GetAllArtistsController } from './controllers/artist/get-all-artists.controller';
import { PostArtistsController } from './controllers/artist/post-artists.controller';
import { Album } from '../../domain/album';
import { CqrsModule } from '@nestjs/cqrs';
import { ArtistsResolver } from './graphql/resolvers/artists.resolver';

const controllers = [GetAllArtistsController, PostArtistsController];
const messageHandlers = [CreateArtistCommandHandler, GetAllArtistsQueryHandler];
const graphqlResolvers = [ArtistsResolver];

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album]), CqrsModule],
  controllers,
  providers: [
    TypeormArtistRepository,
    {
      provide: 'ARTISTS_REPOSITORY',
      useExisting: TypeormArtistRepository,
    },
    ...messageHandlers,
    ...graphqlResolvers,
  ],
})
export class ChinookNestjsModule {}
