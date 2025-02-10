import { Module } from '@nestjs/common';
import { BrandsController } from 'src/products/controllers/brands.controller';
import { CategoriesController } from 'src/products/controllers/categories.controller';
import { ProductsController } from 'src/products/controllers/products.controller';
import { BrandsService } from 'src/products/services/brands.service';
import { CategoriesService } from 'src/products/services/categories.service';
import { ProductsService } from 'src/products/services/products.service';

@Module({
    controllers: [BrandsController, CategoriesController, ProductsController],
    providers: [BrandsService, CategoriesService, ProductsService],
})
export class UsersModule {}
