import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class createOrderItemDTO {
    @IsNumber()
    @IsPositive()
    @ApiProperty()
    readonly orderId: number;
    @IsNumber()
    @IsPositive()
    @ApiProperty()
    readonly productId: number;
    @IsNumber()
    @IsPositive()
    @ApiProperty()
    readonly quantity: number;
}

export class updateOrderItemDTO extends PartialType(createOrderItemDTO) {}
