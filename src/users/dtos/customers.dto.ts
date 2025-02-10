import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsPositive,
    IsEmail,
    IsPhoneNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createCustomerDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsPhoneNumber('AR')
    @IsNotEmpty()
    phone: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    userId: number;
}

export class updateCustomerDTO extends PartialType(createCustomerDTO) {}
