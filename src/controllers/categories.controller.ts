import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { RESPONSES } from '@utils/constants';
import { success } from '@utils/network';

const OBJECT = 'categories';
@Controller(OBJECT)
export class CategoriesController {
    @Get()
    getAll() {
        return success({
            response: RESPONSES.SUCCESS,
            object: OBJECT,
        });
    }

    @Get(':id/products/:productId')
    getCategories(
        @Param('id') id: string,
        @Param('productId') productId: string,
    ) {
        return `category ${id} Product ${productId}`;
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
