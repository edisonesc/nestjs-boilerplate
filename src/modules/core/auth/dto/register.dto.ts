import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @MinLength(8, {
    message: 'Password must be longer than or equal to 8 characters',
  })
  password: string;
}
