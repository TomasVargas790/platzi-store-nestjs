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
import { createCategoryDTO, updateCategoryDTO } from 'src/dtos/categories.dto';
import { CategoriesService } from 'src/services/categories.service';

const OBJECT = 'categories';
@Controller(OBJECT)
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    getAll() {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { rows: this.categoriesService.findAll() },
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
    create(@Body() payload: createCategoryDTO) {
        const category = this.categoriesService.create(payload);
        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: OBJECT,
            },
            category,
        );
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: updateCategoryDTO = {}) {
        const category = this.categoriesService.update(id, payload);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            category,
        );
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        this.categoriesService.delete(id);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }
}
