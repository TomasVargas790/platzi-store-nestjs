import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsPositive,
    IsEmail,
    IsPhoneNumber,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class createCustomerDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ description: 'the email of the user' })
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
