import { Album } from './album';
import { strict as assert } from 'assert';
import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Artist' })
export class Artist {
  @PrimaryKey({ name: 'ArtistId' })
  id: number;

  @Property({ name: 'Name' })
  name: string;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];

  constructor(name: string) {
    this.assertNameIsNotEmpty(name);

    this.name = name;
  }

  private assertNameIsNotEmpty(name: string) {
    assert.notEqual(name, '');
  }
}
