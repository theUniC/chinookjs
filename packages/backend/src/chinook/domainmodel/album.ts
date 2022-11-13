import { Artist } from './artist';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { strict as assert } from 'assert';

@Entity({ tableName: 'Album' })
export class Album {
  @PrimaryKey({ name: 'AlbumId' })
  private id: number;

  @Property({ name: 'Title' })
  private title: string;

  @ManyToOne(() => Artist, { joinColumn: 'ArtistId' })
  private artist: Artist;

  constructor(title: string) {
    this.assertTitleIsNotEmpty(title);

    this.title = title;
  }

  getArtist = (): Artist => this.artist;
  setArtist = (artist: Artist): void => {
    this.artist = artist;
  };

  private assertTitleIsNotEmpty = (title: string): void => {
    assert(title.length > 0);
  };
}
