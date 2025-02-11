import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class createBrandDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class updateBrandDTO extends PartialType(createBrandDTO) {}
