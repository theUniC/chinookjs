import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { GetArtistByIdQuery } from '../../../../application/query/get-artist-by-id/get-artist-by-id.query';

@Controller('artists')
@ApiTags('artists')
export class GetArtistController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async handleRequest(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.queryBus.execute(new GetArtistByIdQuery(id));
    } catch (e) {
      if (e.name === 'ArtistWasNotFound') {
        throw new HttpException(e.message(), 404);
      }

      throw e;
    }
  }
}
