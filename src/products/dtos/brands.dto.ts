import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createBrandDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class updateBrandDTO extends PartialType(createBrandDTO) {}
