import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Artist } from '../../../domain/artist';

export class ArtistDto {
  @ApiProperty()
  readonly id: number | null;

  @ApiProperty()
  @IsNotEmpty()
  readonly artistName: string;

  constructor(artistName: string, id: number | null = null) {
    this.artistName = artistName;
    this.id = id;
  }

  static fromArtist(a: Artist) {
    return new ArtistDto(a.name, a.id);
  }
}
