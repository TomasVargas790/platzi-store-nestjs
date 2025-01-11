import { Body, Controller, Get, Post } from '@nestjs/common';
import { RESPONSES } from 'src/utils/constants';
import { success } from 'src/utils/network';

const OBJECT = 'orders';

@Controller('orders')
export class OrdersController {
    @Get()
    getAll() {
        return success({
            response: RESPONSES.SUCCESS,
            object: OBJECT,
        });
    }

    @Post()
    create(@Body() payload: object = {}) {
        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: OBJECT,
            },
            payload,
        );
    }
}
