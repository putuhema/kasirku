import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  public phone: string;

  @IsNotEmpty()
  @IsString()
  public imageUrl: string;

  @IsNotEmpty()
  @IsString()
  public role: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  public password: string;
}
