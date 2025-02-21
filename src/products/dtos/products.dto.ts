import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class createProductDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly stock: number;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    readonly image: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly brandId: number;
}

export class updateProductDTO extends PartialType(createProductDTO) {}
