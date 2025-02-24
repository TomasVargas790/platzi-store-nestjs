import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { RESPONSES } from '@utils/constants';
import { success } from '@utils/network';
import {
    createCategoryDTO,
    updateCategoryDTO,
} from 'src/products/dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

const OBJECT = 'categories';
@Controller(OBJECT)
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    async getAll() {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { rows: await this.categoriesService.findAll() },
        );
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            {
                rows: await this.categoriesService.findOne(id),
            },
        );
    }

    @Get(':id/products/:productId')
    getCategories(
        @Param('id') id: string,
        @Param('productId') productId: string,
    ) {
        return `category ${id} Product ${productId}`;
    }

    @Post()
    async create(@Body() payload: createCategoryDTO) {
        const category = await this.categoriesService.create(payload);
        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: OBJECT,
            },
            category,
        );
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() payload: updateCategoryDTO = {},
    ) {
        const category = await this.categoriesService.update(id, payload);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            category,
        );
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.categoriesService.delete(id);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }
}
