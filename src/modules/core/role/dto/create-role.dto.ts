import { ApiProperty } from '@dataui/crud/lib/crud';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Role name required' })
  @IsString()
  name: string;

  @ApiProperty({
    type: [Number],
  })
  @IsNumber({}, { each: true })
  @IsNotEmpty({ message: 'Role must have atleast (1) permission' })
  permissionIds: number[];
}
