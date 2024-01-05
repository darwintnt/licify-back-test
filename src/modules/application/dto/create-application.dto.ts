import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

interface Item {
  description: string;
  value: number;
}

export class CreateApplicationDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly user_id: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly project_id: string;

  @IsArray()
  @IsNotEmpty()
  readonly items: Array<Item>;
}
