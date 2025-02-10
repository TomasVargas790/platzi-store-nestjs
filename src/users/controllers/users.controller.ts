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
import { createUserDTO, updateUserDTO } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users.service';

const OBJECT = 'users';

@Controller(OBJECT)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAll() {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { rows: this.usersService.findAll() },
        );
    }

    @Post()
    create(@Body() payload: createUserDTO) {
        const user = this.usersService.create(payload);
        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: OBJECT,
            },
            user,
        );
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() payload: updateUserDTO = {}) {
        const user = this.usersService.update(id, payload);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            user,
        );
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        this.usersService.delete(id);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }
}
