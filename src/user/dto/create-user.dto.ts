import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsOptional()
  @IsString()
  readonly companyName?: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly iban?: string;

  @IsOptional()
  @IsString()
  readonly tel1?: string;

  @IsOptional()
  @IsString()
  readonly tel2?: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
