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
} from '@nestjs/common';
import { RESPONSES } from '@utils/constants';
import { success } from '@utils/network';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { ProductsService } from 'src/products/services/products.service';
import {
    createProductDTO,
    updateProductDTO,
} from 'src/products/dtos/products.dto';

const OBJECT = 'products';

@Controller(OBJECT)
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(+id);
    }

    @Get()
    getProducts() {
        // @Query('brand') brand = '', // @Query('offset') offset = 0, // @Query('limit') limit = 100,
        //return { message: `limit ${limit} offset ${offset} brand ${brand}` };
        return this.productsService.findAll();
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

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        this.productsService.delete(+id);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }
}
