import { Body, Controller, Post } from '@nestjs/common';
import { createOrderItemDTO } from '../dtos/orders-item-dto';
import { OrderItemService } from '../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
    constructor(private orderItemService: OrderItemService) {}
    @Post()
    async create(@Body() payload: createOrderItemDTO) {
        return await this.orderItemService.create(payload);
    }
}
