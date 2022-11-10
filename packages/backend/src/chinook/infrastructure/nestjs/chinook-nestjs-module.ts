import { Module } from '@nestjs/common';
import { Artist } from '../../domainmodel/artist';
import { CreateArtistCommandHandler } from '../../application/command/create-artist/create-artist-command-handler';
import { GetAllArtistsQueryHandler } from '../../application/query/get-all-artists/get-all-artists-query-handler';
import { GetAllArtistsController } from './controllers/artist/get-all-artists.controller';
import { PostArtistsController } from './controllers/artist/post-artists.controller';
import { Album } from '../../domainmodel/album';
import { CqrsModule } from '@nestjs/cqrs';
import { GetArtistController } from './controllers/artist/get-artist.controller';
import { GetArtistByIdQueryHandler } from '../../application/query/get-artist-by-id/get-artist-by-id.query.handler';
import { ArtistResolver } from './graphql/resolvers/artist.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroormArtistRepository } from '../persistence/mikroorm-artist-repository';

const controllers = [
  GetAllArtistsController,
  PostArtistsController,
  GetArtistController,
];

const messageHandlers = [
  CreateArtistCommandHandler,
  GetAllArtistsQueryHandler,
  GetArtistByIdQueryHandler,
];

const graphqlResolvers = [ArtistResolver];

@Module({
  imports: [MikroOrmModule.forFeature([Artist, Album]), CqrsModule],
  controllers,
  providers: [
    MikroormArtistRepository,
    {
      provide: 'ARTISTS_REPOSITORY',
      useExisting: MikroormArtistRepository,
    },
    ...messageHandlers,
    ...graphqlResolvers,
  ],
})
export class ChinookNestjsModule {}
