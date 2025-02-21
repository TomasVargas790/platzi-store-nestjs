import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
    BrandsController,
    CategoriesController,
    ProductsController,
} from './controllers';
import { BrandsService, CategoriesService, ProductsService } from './services';
import { Product, Brand, Category } from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
    controllers: [BrandsController, CategoriesController, ProductsController],
    providers: [BrandsService, CategoriesService, ProductsService],
    exports: [ProductsService],
})
export class ProductsModule {}
