import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ArtistDto } from '../../dtos/artist-dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetArtistByIdQuery } from '../../../../application/query/get-artist-by-id/get-artist-by-id.query';
import { PaginationArgs } from '../args/pagination.args';
import { GetAllArtistsQuery } from '../../../../application/query/get-all-artists/get-all-artists-query';

@Resolver(() => ArtistDto)
export class ArtistResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ArtistDto)
  async artist(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ArtistDto> {
    return ArtistDto.fromArtist(
      await this.queryBus.execute(new GetArtistByIdQuery(id)),
    );
  }

  @Query(() => [ArtistDto])
  async artists(
    @Args() { limit, offset }: PaginationArgs,
  ): Promise<ArtistDto[]> {
    return (
      await this.queryBus.execute(new GetAllArtistsQuery(offset, limit))
    ).map(ArtistDto.fromArtist);
  }
}
