import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Put,
    Delete,
} from '@nestjs/common';
import { RESPONSES } from '@utils/constants';
import { success } from '@utils/network';

const OBJECT = 'products';

@Controller(OBJECT)
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

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: object = {}) {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { ...payload, id },
        );
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }
}
