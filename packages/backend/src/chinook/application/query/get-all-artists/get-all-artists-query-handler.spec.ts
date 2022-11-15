import { GetAllArtistsQueryHandler } from './get-all-artists-query-handler';
import { ArtistRepository } from '../../../domainmodel/artist/artist-repository';
import { InMemoryArtistRepository } from '../../../infrastructure/persistence/in-memory-artist-repository';
import { Artist } from '../../../domainmodel/artist/artist';
import { GetAllArtistsQuery } from './get-all-artists-query';

describe('GetAllArtistsQueryHandler', () => {
  let artistsRepository: ArtistRepository;
  let getAllArtistsQueryHandler: GetAllArtistsQueryHandler;

  beforeEach(() => {
    artistsRepository = new InMemoryArtistRepository();
    getAllArtistsQueryHandler = new GetAllArtistsQueryHandler(
      artistsRepository,
    );
  });

  it('should return all artists', async function () {
    const artist = new Artist('artistName');
    await artistsRepository.save(artist);
    const artists = await getAllArtistsQueryHandler.execute(
      new GetAllArtistsQuery(),
    );

    expect(artists.length).toBe(1);
  });
});
