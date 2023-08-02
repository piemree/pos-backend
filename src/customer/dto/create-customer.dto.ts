import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsEmail,
  Length,
} from 'class-validator';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial } from 'typeorm';

export class CreateCustomerBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  @Length(26, 26)
  iban?: string;

  @IsOptional()
  @IsString()
  tel?: string;

  @IsOptional()
  @IsNumber()
  balance?: number;
}

export class CreateCustomerDto {
  name: string;

  surname?: string;

  companyName?: string;

  email?: string;

  address?: string;

  iban?: string;

  tel?: string;

  balance?: number;

  user: DeepPartial<User>;

  transactions?: DeepPartial<Transaction[]>;
}
