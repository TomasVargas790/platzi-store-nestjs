import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { RESPONSES } from '@utils/constants';
import { success } from '@utils/network';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { createOrderDTO, updateOrderDTO } from 'src/users/dtos/orders.dto';
import { OrdersService } from 'src/users/services/orders.service';

const OBJECT = 'orders';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get()
    async getAll() {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            {
                rows: await this.ordersService.findAll(),
            },
        );
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { rows: await this.ordersService.findOne(id) },
        );
    }

    @Post()
    async create(@Body() payload: createOrderDTO) {
        const order = await this.ordersService.create(payload);
        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: OBJECT,
            },
            order,
        );
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() payload: updateOrderDTO = {},
    ) {
        const order = await this.ordersService.update(id, payload);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            order,
        );
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.ordersService.delete(id);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }
}
