import { IsNumber, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class createOrderDTO {
    @IsNumber()
    @IsPositive()
    readonly customerId: number;
}

export class updateOrderDTO extends PartialType(createOrderDTO) {}
