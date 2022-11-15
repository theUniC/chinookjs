import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { ChangeArtistNameCommand } from '../../../../application/command/change-artist-name/change-artist-name-command';
import { ArtistDto } from '../../dtos/artist-dto';

@Controller('artists')
@ApiTags('artists')
export class PutArtistController {
  constructor(private readonly commandBus: CommandBus) {}

  @Put(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async handleRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() { artistName }: ArtistDto,
  ) {
    try {
      return await this.commandBus.execute(
        new ChangeArtistNameCommand(id, artistName),
      );
    } catch (e) {
      if (e.name === 'ArtistWasNotFound') {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }

      throw e;
    }
  }
}
