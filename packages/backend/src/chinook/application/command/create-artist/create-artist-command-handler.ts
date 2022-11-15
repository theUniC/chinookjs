import { CreateArtistCommand } from './create-artist-command';
import { ArtistRepository } from '../../../domainmodel/artist/artist-repository';
import { Inject } from '@nestjs/common';
import { Artist } from '../../../domainmodel/artist/artist';
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
    await this.artistRepository.save(artist);
  }
}
