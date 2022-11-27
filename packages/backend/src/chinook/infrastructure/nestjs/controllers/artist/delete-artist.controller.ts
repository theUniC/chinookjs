import {
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { RemoveArtistCommand } from '../../../../application/command/remove-artist/remove-artist-command';

@Controller('artists')
@ApiTags('artists')
export class DeleteArtistController {
  constructor(private commandBus: CommandBus) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiNotFoundResponse()
  handleRequest(@Param('id') id: number) {
    try {
      this.commandBus.execute(new RemoveArtistCommand(id));
    } catch (e) {
      if (e.name === 'ArtistWasNotFound') {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }

      throw e;
    }
  }
}
