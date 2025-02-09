import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { BrandsController } from './controllers/brands.controller';
import { ConfigModule } from '@nestjs/config';
import { ProductsService } from './services/products.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
    ],
    controllers: [
        AppController,
        ProductsController,
        CategoriesController,
        OrdersController,
        UsersController,
        CustomersController,
        BrandsController,
    ],
    providers: [AppService, ProductsService],
})
export class AppModule {}
