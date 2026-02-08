import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Permission is required' })
  name: string;
}
