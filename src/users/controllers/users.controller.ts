import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RESPONSES } from '@utils/constants';
import { success } from '@utils/network';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { createUserDTO, updateUserDTO } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users.service';

const OBJECT = 'users';

@ApiTags('Users')
@Controller(OBJECT)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    async getAll() {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { rows: await this.usersService.findAll() },
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
                rows: await this.usersService.findOne(id),
            },
        );
    }

    @Get(':id/orders')
    async getOrdersByUserId(@Param('id', ParseIntPipe) id: number) {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            {
                ...(await this.usersService.findOne(id)),
                orders: await this.usersService.findOrderByUserId(id),
            },
        );
    }

    @Post()
    async create(@Body() payload: createUserDTO) {
        const user = await this.usersService.create(payload);
        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: OBJECT,
            },
            user,
        );
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() payload: updateUserDTO = {}) {
        const user = await this.usersService.update(id, payload);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            user,
        );
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        await this.usersService.delete(id);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }
}
