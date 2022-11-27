import { ArtistRepository } from '../../../domainmodel/artist/artist-repository';
import { RemoveArtistCommandHandler } from './remove-artist-command-handler';
import { InMemoryArtistRepository } from '../../../infrastructure/persistence/in-memory-artist-repository';
import { RemoveArtistCommand } from './remove-artist-command';
import { Artist } from '../../../domainmodel/artist/artist';

describe('RemoveArtistCommandHandler', () => {
  let artistRepository: ArtistRepository;
  let removeCommandHandler: RemoveArtistCommandHandler;

  beforeEach(() => {
    artistRepository = new InMemoryArtistRepository();
    removeCommandHandler = new RemoveArtistCommandHandler(artistRepository);
  });

  it('should throw an exception if the artist to remove does not exist', async () => {
    await expect(async () => {
      await removeCommandHandler.execute(new RemoveArtistCommand(1));
    }).rejects.toThrowError();
  });

  it('should remove the artist successfully', async () => {
    const artist = new Artist('test');
    await artistRepository.save(artist);

    await removeCommandHandler.execute(new RemoveArtistCommand(artist.id));

    const allArtists = await artistRepository.all(0, 10);

    expect(allArtists).toStrictEqual([]);
  });
});
