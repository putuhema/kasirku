import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  public name: string;
  @IsNotEmpty()
  @IsString()
  public payment: string;

  @IsArray()
  public orders: Orders[];
}

class Orders {
  @IsNotEmpty()
  @IsNumber()
  public productId: number;

  @IsNotEmpty()
  @IsNumber()
  public quantity: number;

  @IsNotEmpty()
  @IsNumber()
  public price: number;
}
