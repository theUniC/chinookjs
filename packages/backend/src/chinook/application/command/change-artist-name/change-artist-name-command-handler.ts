import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeArtistNameCommand } from './change-artist-name-command';
import { ArtistRepository } from '../../../domainmodel/artist/artist-repository';
import { ArtistWasNotFound } from '../../../domainmodel/artist/artist-was-not-found';
import { Inject } from '@nestjs/common';

@CommandHandler(ChangeArtistNameCommand)
export class ChangeArtistNameCommandHandler
  implements ICommandHandler<ChangeArtistNameCommand>
{
  constructor(
    @Inject('ARTISTS_REPOSITORY')
    private readonly artistRepository: ArtistRepository,
  ) {}

  async execute(command: ChangeArtistNameCommand): Promise<void> {
    const artist = await this.artistRepository.byId(command.id);

    if (!artist) {
      throw ArtistWasNotFound.withIdOf(command.id);
    }

    artist.changeName(command.name);

    await this.artistRepository.save(artist);
  }
}
