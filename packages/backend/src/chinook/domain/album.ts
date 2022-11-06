import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Artist } from './artist';

@Entity('Album')
export class Album {
  @PrimaryColumn({ name: 'AlbumId' })
  id: number;

  @Column({ name: 'Title' })
  title: string;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  @JoinColumn({ name: 'ArtistId' })
  artist: Artist;
}
