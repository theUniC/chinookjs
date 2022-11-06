import { CreateArtistCommand } from './create-artist-command';
import { ArtistRepository } from '../../../domain/artist-repository';
import { Inject, Injectable } from '@nestjs/common';
import { Artist } from '../../../domain/artist';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateArtistCommand)
export class CreateArtistCommandHandler
  implements ICommandHandler<CreateArtistCommand>
{
  constructor(
    @Inject('ARTISTS_REPOSITORY')
    private readonly artistRepository: ArtistRepository,
  ) {}

  async execute({ artistName }: CreateArtistCommand) {
    let artist = await this.artistRepository.byName(artistName);

    if (artist) {
      throw new Error(`Artist with name ${artistName} already exists`);
    }

    artist = new Artist(artistName);
    await this.artistRepository.add(artist);
  }
}
