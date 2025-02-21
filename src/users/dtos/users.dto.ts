import {
    IsString,
    IsNotEmpty,
    IsEmail,
    IsPositive,
    IsNumber,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class createUserDTO {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly role: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly customerId: number;
}

export class updateUserDTO extends PartialType(createUserDTO) {}
