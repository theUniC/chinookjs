import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Album } from './album';
import { strict as assert } from 'assert';

@Entity('Artist')
export class Artist {
  @PrimaryColumn({ name: 'ArtistId' })
  id: number;

  @Column({ name: 'Name' })
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
