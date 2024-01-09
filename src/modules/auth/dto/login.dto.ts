import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'test@test.com',
    required: true,
  })
  @IsEmail({}, { message: 'Ingrese un email valido' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'xxxxxxxx',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
