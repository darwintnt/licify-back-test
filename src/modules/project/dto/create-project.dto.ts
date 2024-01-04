import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsDateString()
  @IsNotEmpty()
  readonly init_date: string;

  @IsDateString()
  @IsNotEmpty()
  readonly end_date: string;
}
