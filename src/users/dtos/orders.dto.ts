import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class createOrderDTO {
    @IsNumber()
    @IsPositive()
    @ApiProperty()
    readonly customerId: number;
}

export class updateOrderDTO extends PartialType(createOrderDTO) {}
