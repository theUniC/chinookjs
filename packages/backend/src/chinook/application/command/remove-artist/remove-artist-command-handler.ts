import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveArtistCommand } from './remove-artist-command';
import { ArtistRepository } from '../../../domainmodel/artist/artist-repository';
import { Inject } from '@nestjs/common';
import { ArtistWasNotFound } from '../../../domainmodel/artist/artist-was-not-found';

@CommandHandler(RemoveArtistCommand)
export class RemoveArtistCommandHandler
  implements ICommandHandler<RemoveArtistCommand>
{
  constructor(
    @Inject('ARTISTS_REPOSITORY') private artistRepository: ArtistRepository,
  ) {}

  async execute(command: RemoveArtistCommand): Promise<void> {
    const artist = await this.artistRepository.byId(command.id);

    if (!artist) {
      throw ArtistWasNotFound.withIdOf(command.id);
    }

    await this.artistRepository.remove(artist);
  }
}
