import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createCategoryDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class updateCategoryDTO extends PartialType(createCategoryDTO) {}
