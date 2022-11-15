import { Album } from '../album/album';
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

  // @ts-ignore
  @OneToMany(() => Album, (album) => album.artist)
  albums = new Collection<Album>(this);

  constructor(name: string) {
    this.assertNameIsNotEmpty(name);

    this.name = name;
  }

  addAlbum(album: Album) {
    album.setArtist(this);
    this.albums.add(album);
  }

  changeName(newName: string) {
    this.name = newName;
  }

  private assertNameIsNotEmpty = (name: string) => {
    assert.notEqual(name, '');
  };
}
