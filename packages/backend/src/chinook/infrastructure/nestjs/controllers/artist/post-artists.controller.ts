import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateArtistCommand } from '../../../../application/command/create-artist/create-artist-command';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { ArtistDto } from '../../dtos/artist-dto';

@ApiTags('artists')
@Controller('artists')
export class PostArtistsController {
  constructor(readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse()
  async handleRequest(@Body() { artistName }: ArtistDto) {
    await this.commandBus.execute(new CreateArtistCommand(artistName));
  }
}
