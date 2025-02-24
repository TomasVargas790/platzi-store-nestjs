import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    HttpStatus,
    HttpCode,
    Query,
} from '@nestjs/common';
import { RESPONSES } from '@utils/constants';
import { success } from '@utils/network';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { ProductsService } from '../services/products.service';
import {
    createProductDTO,
    FilterProductsDTO,
    updateProductDTO,
} from '../dtos/products.dto';

const OBJECT = 'products';

@Controller(OBJECT)
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    async getProduct(@Param('id', ParseIntPipe) id: number) {
        return await this.productsService.findOne(id);
    }

    @Get()
    getProducts(@Query() params?: FilterProductsDTO) {
        return this.productsService.findAll(params);
    }

    @Post()
    create(@Body() payload: createProductDTO) {
        this.productsService.create(payload);

        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: 'products',
            },
            payload,
        );
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: updateProductDTO,
    ) {
        this.productsService.update(id, payload);

        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { ...payload, id },
        );
    }

    @Put(':id/category/:categoryId')
    async addCategory(
        @Param('id', ParseIntPipe) id: number,
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ) {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            {
                ...(await this.productsService.addCategoryByProductId(
                    id,
                    categoryId,
                )),
            },
        );
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.productsService.delete(id);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }

    @Delete(':id/category/:categoryId')
    async deleteCategory(
        @Param('id', ParseIntPipe) id: number,
        @Param('categoryId', ParseIntPipe) categoryId: number,
    ) {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            {
                ...(await this.productsService.removeCategoryByProductId(
                    id,
                    categoryId,
                )),
            },
        );
    }
}
