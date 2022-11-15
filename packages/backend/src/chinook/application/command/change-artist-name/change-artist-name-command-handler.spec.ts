import { ArtistRepository } from '../../../domainmodel/artist/artist-repository';
import { InMemoryArtistRepository } from '../../../infrastructure/persistence/in-memory-artist-repository';
import { ChangeArtistNameCommand } from './change-artist-name-command';
import { ChangeArtistNameCommandHandler } from './change-artist-name-command-handler';
import { CreateArtistCommandHandler } from '../create-artist/create-artist-command-handler';
import { Artist } from '../../../domainmodel/artist/artist';

describe('UpdateArtistCommandHandler', () => {
  let artistRepository: ArtistRepository;
  let changeArtistNameCommandHandler: ChangeArtistNameCommandHandler;

  beforeEach(() => {
    artistRepository = new InMemoryArtistRepository();
    changeArtistNameCommandHandler = new ChangeArtistNameCommandHandler(
      artistRepository,
    );
  });

  it('should throw an exception if artist does not exist', async () => {
    await expect(async () => {
      await changeArtistNameCommandHandler.execute(
        new ChangeArtistNameCommand(50, 'test'),
      );
    }).rejects.toThrowError();
  });

  it('should change artist name successfully', async () => {
    const artist = new Artist('name');
    await artistRepository.save(artist);

    await changeArtistNameCommandHandler.execute(
      new ChangeArtistNameCommand(artist.id, 'new-name'),
    );

    expect(artist.name).toBe('new-name');
  });
});
