import { ArtistRepository } from '../../../domainmodel/artist/artist-repository';
import { GetArtistByIdQueryHandler } from './get-artist-by-id.query.handler';
import { InMemoryArtistRepository } from '../../../infrastructure/persistence/in-memory-artist-repository';
import { GetArtistByIdQuery } from './get-artist-by-id.query';
import { Artist } from '../../../domainmodel/artist/artist';

describe('GetArtistByIdQueryHandler', () => {
  let artistRepository: ArtistRepository;
  let getArtistByIdQueryHandler: GetArtistByIdQueryHandler;

  beforeEach(() => {
    artistRepository = new InMemoryArtistRepository();
    getArtistByIdQueryHandler = new GetArtistByIdQueryHandler(artistRepository);
  });

  it('should throw an error when artist is not found', async () => {
    await expect(
      async () =>
        await getArtistByIdQueryHandler.execute(new GetArtistByIdQuery(1)),
    ).rejects.toThrowError();
  });

  it('should return a given artist by id', async () => {
    await artistRepository.save(new Artist('test'));
    const artist = await getArtistByIdQueryHandler.execute(
      new GetArtistByIdQuery(1),
    );

    expect(artist).toBeInstanceOf(Artist);
  });
});
