import { GetAllArtistsQuery } from './get-all-artists-query';
import { ArtistRepository } from '../../../domainmodel/artist-repository';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAllArtistsQuery)
export class GetAllArtistsQueryHandler
  implements IQueryHandler<GetAllArtistsQuery>
{
  constructor(
    @Inject('ARTISTS_REPOSITORY')
    private readonly artistsRepository: ArtistRepository,
  ) {}

  async execute({ limit, offset }: GetAllArtistsQuery) {
    return await this.artistsRepository.all(offset, limit);
  }
}
