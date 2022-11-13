import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Album } from './album';
import { Genre } from './genre';
import { MediaType } from './media-type';

@Entity({ tableName: 'Track' })
export class Track {
  @PrimaryKey({ fieldName: 'TrackId' })
  id!: number;

  @Property({ fieldName: 'Name', length: 200 })
  name!: string;

  @ManyToOne({
    entity: () => Album,
    fieldName: 'AlbumId',
    nullable: true,
    index: 'IFK_TrackAlbumId',
  })
  albumId!: Album;

  @ManyToOne({
    entity: () => MediaType,
    fieldName: 'MediaTypeId',
    index: 'IFK_TrackMediaTypeId',
  })
  mediaType!: MediaType;

  @ManyToOne({
    entity: () => Genre,
    fieldName: 'GenreId',
    nullable: true,
    index: 'IFK_TrackGenreId',
  })
  genre?: Genre;

  @Property({ fieldName: 'Composer', length: 220, nullable: true })
  composer?: string;

  @Property({ fieldName: 'Milliseconds' })
  milliseconds!: number;

  @Property({ fieldName: 'Bytes', nullable: true })
  bytes!: number;

  @Property({ fieldName: 'UnitPrice', columnType: 'decimal(10,2)' })
  unitPrice!: string;
}
