import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'Genre' })
export class Genre {
  @PrimaryKey({ fieldName: 'GenreId' })
  id!: number;

  @Property({ fieldName: 'Name', length: 120, nullable: true })
  name!: string;
}
