import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Artist } from '../../../domain/artist';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArtistDto {
  @ApiProperty()
  @Field(() => Int, { nullable: true })
  readonly id: number | null;

  @ApiProperty()
  @IsNotEmpty()
  @Field({ nullable: true })
  readonly artistName: string;

  constructor(artistName: string, id: number | null = null) {
    this.artistName = artistName;
    this.id = id;
  }

  static fromArtist(a: Artist) {
    return new ArtistDto(a.name, a.id);
  }
}
