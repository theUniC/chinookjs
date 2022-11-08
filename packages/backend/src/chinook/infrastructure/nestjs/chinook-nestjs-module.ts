import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../../domainmodel/artist';
import { TypeormArtistRepository } from '../persistence/typeorm-artist-repository';
import { CreateArtistCommandHandler } from '../../application/command/create-artist/create-artist-command-handler';
import { GetAllArtistsQueryHandler } from '../../application/query/get-all-artists/get-all-artists-query-handler';
import { GetAllArtistsController } from './controllers/artist/get-all-artists.controller';
import { PostArtistsController } from './controllers/artist/post-artists.controller';
import { Album } from '../../domainmodel/album';
import { CqrsModule } from '@nestjs/cqrs';
import { GetArtistController } from './controllers/artist/get-artist.controller';
import { GetArtistByIdQueryHandler } from '../../application/query/get-artist-by-id/get-artist-by-id.query.handler';

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
  ],
})
export class ChinookNestjsModule {}
