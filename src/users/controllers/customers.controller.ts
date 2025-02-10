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
    getAll() {
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { rows: this.customersService.findAll() },
        );
    }

    @Post()
    create(@Body() payload: createCustomerDTO) {
        const customer = this.customersService.create(payload);
        return success(
            {
                response: RESPONSES.SUCCESS_CREATION,
                object: OBJECT,
            },
            customer,
        );
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: updateCustomerDTO = {},
    ) {
        const customer = this.customersService.update(id, payload);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            customer,
        );
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        this.customersService.delete(id);
        return success(
            {
                response: RESPONSES.SUCCESS,
                object: OBJECT,
            },
            { id },
        );
    }
}
