import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class createCustomerDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsPhoneNumber('AR')
    @IsNotEmpty()
    phone: string;
}

export class updateCustomerDTO extends PartialType(createCustomerDTO) {}
