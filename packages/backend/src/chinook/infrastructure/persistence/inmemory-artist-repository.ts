import { ArtistRepository } from '../../domain/artist-repository';
import { Artist } from '../../domain/artist';

export class InmemoryArtistRepository implements ArtistRepository {
  private artists: Artist[] = [];

  add(artist: Artist): Promise<void> {
    artist.id = this.artists.length + 1;
    this.artists.push(artist);
    return Promise.resolve(undefined);
  }

  all(): Promise<Artist[]> {
    return Promise.resolve(this.artists);
  }

  byId(id: number): Promise<Artist | null> {
    const artist = this.artists.filter((a) => a.id === id).pop();

    if (!artist) {
      return Promise.resolve(null);
    }

    return Promise.resolve(artist);
  }

  byName(name: string): Promise<Artist | null> {
    const artist = this.artists.filter((a) => a.name === name).pop();

    if (!artist) {
      return Promise.resolve(null);
    }

    return Promise.resolve(artist);
  }
}
