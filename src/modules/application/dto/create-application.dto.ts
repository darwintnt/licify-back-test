import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

interface Item {
  description: string;
  value: number;
}

export class CreateApplicationDto {
  @ApiProperty({
    example: '659a1a0616f6ee7ebb17896c',
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  readonly user_id: string;

  @ApiProperty({
    example: '766a1a0616f6ee7ebb17828c',
    required: true,
  })
  @IsMongoId()
  @IsNotEmpty()
  readonly project_id: string;

  @ApiProperty({
    isArray: true,
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  readonly items: Array<Item>;
}
