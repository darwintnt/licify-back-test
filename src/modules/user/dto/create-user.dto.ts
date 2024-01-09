import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Pepito Perez',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: 'test@test.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'xxxxxxxx',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'provider|constructor',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}
