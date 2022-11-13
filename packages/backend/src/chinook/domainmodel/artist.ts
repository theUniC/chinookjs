import { Album } from './album';
import { strict as assert } from 'assert';
import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity({ tableName: 'Artist' })
export class Artist {
  @PrimaryKey({ name: 'ArtistId' })
  id: number;

  @Property({ name: 'Name' })
  name: string;

  @OneToMany(() => Album, (album) => album.getArtist())
  albums = new Collection<Album>(this);

  constructor(name: string) {
    this.assertNameIsNotEmpty(name);

    this.name = name;
  }

  addAlbum = (album: Album) => {
    album.setArtist(this);
    this.albums.add(album);
  };

  private assertNameIsNotEmpty = (name: string) => {
    assert.notEqual(name, '');
  };
}
