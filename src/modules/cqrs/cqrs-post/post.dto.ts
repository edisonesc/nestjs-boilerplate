import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class PostDTO {
  @ApiProperty()
  @Allow()
  title: string;

  @ApiProperty()
  @Allow()
  body: string;
}
