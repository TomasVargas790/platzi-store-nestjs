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
import {
    createCustomerDTO,
    updateCustomerDTO,
} from 'src/users/dtos/customers.dto';
import { CustomersService } from 'src/users/services/customers.service';

const OBJECT = 'customers';

@Controller(OBJECT)
export class CustomersController {
    constructor(private customersService: CustomersService) {}

    @Get()
    async getAll() {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { rows: await this.customersService.findAll() },
        );
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { rows: await this.customersService.findOne(id) },
        );
    }

    @Post()
    async create(@Body() payload: createCustomerDTO) {
        const customer = await this.customersService.create(payload);
        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: OBJECT,
            },
            customer,
        );
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: updateCustomerDTO = {},
    ) {
        const customer = await this.customersService.update(id, payload);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            customer,
        );
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.customersService.delete(id);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }
}
