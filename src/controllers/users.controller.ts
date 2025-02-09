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

const OBJECT = 'users';

@Controller(OBJECT)
export class UsersController {
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
