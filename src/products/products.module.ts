import { Module } from '@nestjs/common';
import { CustomersController } from 'src/users/controllers/customers.controller';
import { OrdersController } from 'src/users/controllers/orders.controller';
import { UsersController } from 'src/users/controllers/users.controller';
import { CustomersService } from 'src/users/services/customers.service';
import { OrdersService } from 'src/users/services/orders.service';
import { UsersService } from 'src/users/services/users.service';

@Module({
    controllers: [UsersController, CustomersController, OrdersController],
    providers: [UsersService, CustomersService, OrdersService],
})
export class ProductsModule {}
