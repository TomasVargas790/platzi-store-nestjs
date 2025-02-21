import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import {
    CustomersController,
    OrdersController,
    UsersController,
} from './controllers';

import { CustomersService, OrdersService, UsersService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, Order, User } from './entities';

@Module({
    imports: [
        ProductsModule,
        TypeOrmModule.forFeature([User, Customer, Order]),
    ],
    controllers: [UsersController, CustomersController, OrdersController],
    providers: [UsersService, CustomersService, OrdersService],
})
export class UsersModule {}
