import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RESPONSES } from '@utils/constants';
import { success } from '@utils/network';

@Controller('products')
export class ProductsController {
    @Get(':id')
    getProduct(@Param('id') params: string) {
        return { message: `product ${params}` };
    }

    @Get()
    getProducts(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brand: string,
    ) {
        return { message: `limit ${limit} offset ${offset} brand ${brand}` };
    }

    @Post()
    create(@Body() payload: object = {}) {
        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: 'products',
            },
            payload,
        );
    }
}
