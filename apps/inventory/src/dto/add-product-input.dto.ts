
import { IsString, IsNumber, IsNotEmpty, IsPositive, IsOptional } from 'class-validator';

export class addProductInput {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;
}
