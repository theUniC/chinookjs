import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetArtistByIdQuery } from './get-artist-by-id.query';
import { ArtistRepository } from '../../../domainmodel/artist-repository';
import { Inject } from '@nestjs/common';
import { Artist } from '../../../domainmodel/artist';
import { ArtistWasNotFound } from '../../../domainmodel/artist-was-not-found';

@QueryHandler(GetArtistByIdQuery)
export class GetArtistByIdQueryHandler
  implements IQueryHandler<GetArtistByIdQuery>
{
  constructor(
    @Inject('ARTISTS_REPOSITORY')
    private readonly artistRepository: ArtistRepository,
  ) {}

  async execute({ id }: GetArtistByIdQuery): Promise<Artist> {
    const artist = await this.artistRepository.byId(id);

    if (!artist) {
      throw ArtistWasNotFound.withIdOf(id);
    }

    return Promise.resolve(artist);
  }
}
