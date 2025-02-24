import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
    IsArray,
    IsOptional,
    Min,
    ValidateIf,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class createProductDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly stock: number;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @ApiProperty()
    readonly image: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty()
    readonly brandId: number;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    readonly categoryIds: number[];
}

export class updateProductDTO extends PartialType(createProductDTO) { }

export class FilterProductsDTO {
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Min(0)
    offset: number;

    @IsOptional()
    @IsPositive()
    minPrice: number;

    @IsOptional()
    @IsPositive()
    @ValidateIf((item) => item.minPrice)
    maxPrice: number;
}
