import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Album } from './album';

@Entity('Artist')
export class Artist {
  @PrimaryColumn({ name: 'ArtistId' })
  id: number;

  @Column({ name: 'Name' })
  name: string;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
