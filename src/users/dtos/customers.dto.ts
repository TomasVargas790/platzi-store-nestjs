import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class createCustomerDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsString()
    @IsPhoneNumber('AR')
    @IsNotEmpty()
    readonly phone: string;
}

export class updateCustomerDTO extends PartialType(createCustomerDTO) {}
