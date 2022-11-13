import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'MediaType' })
export class MediaType {
  @PrimaryKey({ fieldName: 'MediaTypeId' })
  id!: number;

  @Property({ fieldName: 'Name', length: 120, nullable: true })
  Name!: string;
}
