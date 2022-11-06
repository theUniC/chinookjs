import { ApiProperty } from '@nestjs/swagger';

export class ArtistDto {
  @ApiProperty()
  readonly artistName: string;
}
