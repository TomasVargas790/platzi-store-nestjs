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
import { OrderItem } from './entities/order-item.entity';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';

@Module({
    imports: [
        ProductsModule,
        TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
    ],
    controllers: [UsersController, CustomersController, OrdersController, OrderItemController],
    providers: [UsersService, CustomersService, OrdersService, OrderItemService],
})
export class UsersModule {}
