import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

interface Item {
  description: string;
  value: number;
}

export class CreateProjectDto {
  @ApiProperty({
    example: '659a1a0616f6ee7ebb17828c',
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    example: 'prueba',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '1998-03-16',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  readonly init_date: string;

  @ApiProperty({
    example: '1998-05-16',
    required: true,
  })
  @IsDateString()
  @IsNotEmpty()
  readonly end_date: string;

  @ApiProperty({
    isArray: true,
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly items: Item[];

  @ApiProperty({
    isArray: true,
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly images: string[];
}
