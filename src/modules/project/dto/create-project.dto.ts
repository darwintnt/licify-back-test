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
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDateString()
  @IsNotEmpty()
  readonly init_date: string;

  @IsDateString()
  @IsNotEmpty()
  readonly end_date: string;

  @IsArray()
  @IsNotEmpty()
  readonly items: Item[];
}
