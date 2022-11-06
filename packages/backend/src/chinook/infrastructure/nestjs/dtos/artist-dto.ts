import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ArtistDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly artistName: string;
}
