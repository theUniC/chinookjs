import { Controller, Get } from '@nestjs/common';
import { GetAllArtistsQuery } from '../../../../application/query/get-all-artists/get-all-artists-query';
import { ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

@Controller('artists')
@ApiTags('artists')
export class GetAllArtistsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  async handleRequest() {
    return await this.queryBus.execute(new GetAllArtistsQuery());
  }
}
