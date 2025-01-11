import { Body, Controller, Get, Post } from '@nestjs/common';
import { RESPONSES } from '@utils/constants';
import { success } from '@utils/network';

const OBJECT = 'brands';
@Controller(OBJECT)
export class BrandsController {
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
