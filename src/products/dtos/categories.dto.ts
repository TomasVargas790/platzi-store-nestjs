import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class createCategoryDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class updateCategoryDTO extends PartialType(createCategoryDTO) {}
