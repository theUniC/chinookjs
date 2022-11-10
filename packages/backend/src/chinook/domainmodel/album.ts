import { Artist } from './artist';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Album' })
export class Album {
  @PrimaryKey({ name: 'AlbumId' })
  id: number;

  @Property({ name: 'Title' })
  title: string;

  @ManyToOne(() => Artist, { joinColumn: 'ArtistId' })
  artist: Artist;
}
