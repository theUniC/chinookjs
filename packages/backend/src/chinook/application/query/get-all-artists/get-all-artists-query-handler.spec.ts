import { GetAllArtistsQueryHandler } from './get-all-artists-query-handler';
import { ArtistRepository } from '../../../domain/artist-repository';
import { InmemoryArtistRepository } from '../../../infrastructure/persistence/inmemory-artist-repository';
import { Artist } from '../../../domain/artist';
import { GetAllArtistsQuery } from './get-all-artists-query';

describe('GetAllArtistsQueryHandler', () => {
  let artistsRepository: ArtistRepository;
  let getAllArtistsQueryHandler: GetAllArtistsQueryHandler;

  beforeEach(() => {
    artistsRepository = new InmemoryArtistRepository();
    getAllArtistsQueryHandler = new GetAllArtistsQueryHandler(
      artistsRepository,
    );
  });

  it('should return all artists', async function () {
    const artist = new Artist();
    await artistsRepository.add(artist);
    const artists = await getAllArtistsQueryHandler.execute(
      new GetAllArtistsQuery(),
    );

    expect(artists.length).toBe(1);
  });
});
