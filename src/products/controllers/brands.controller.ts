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
import { createBrandDTO, updateBrandDTO } from 'src/products/dtos/brands.dto';
import { BrandsService } from 'src/products/services/brands.service';

const OBJECT = 'brands';
@Controller(OBJECT)
export class BrandsController {
    constructor(private brandsService: BrandsService) {}

    @Get()
    getAll() {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { rows: this.brandsService.findAll() },
        );
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { rows: this.brandsService.findOne(id) },
        );
    }

    @Post()
    create(@Body() payload: createBrandDTO) {
        const brand = this.brandsService.create(payload);
        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: OBJECT,
            },
            brand,
        );
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: updateBrandDTO = {},
    ) {
        const brand = this.brandsService.update(id, payload);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            brand,
        );
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        this.brandsService.delete(id);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }
}
