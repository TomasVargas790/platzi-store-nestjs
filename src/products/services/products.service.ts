import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import {
    createProductDTO,
    FilterProductsDTO,
    updateProductDTO,
} from 'src/products/dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, FindOptionsWhere, In } from 'typeorm';
import { Brand, Category } from '../entities';
@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Brand)
        private brandRepository: Repository<Brand>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(params?: FilterProductsDTO) {
        const where: FindOptionsWhere<Product> = {};
        if (params) {
            const { limit: take, offset: skip, maxPrice, minPrice } = params;

            if (minPrice && maxPrice) {
                where.price = Between(minPrice, maxPrice);
            }
            return await this.productRepository.find({
                relations: ['brand', 'categories'],
                take,
                skip,
                where,
            });
        }
        return await this.productRepository.find({
            relations: ['brand', 'categories'],
        });
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['brand', 'categories'],
        });
        if (!product) {
            throw new NotFoundException(`Product ${id} not found!`);
        }
        return product;
    }

    async create(payload: createProductDTO) {
        const newProduct = this.productRepository.create(payload);
        if (payload.brandId) {
            newProduct.brand = await this.brandRepository.findOne({
                where: { id: payload.brandId },
            });
        }
        if (payload.categoryIds) {
            newProduct.categories = await this.categoryRepository.findByIds(
                payload.categoryIds,
            );
        }
        return this.productRepository.save(newProduct);
    }

    async update(id: number, payload: updateProductDTO) {
        const product = await this.productRepository.findOne({
            where: { id },
        });
        this.productRepository.merge(product, payload);
        if (payload.brandId) {
            product.brand = await this.brandRepository.findOne({
                where: { id: payload.brandId },
            });
        }
        if (payload.categoryIds) {
            product.categories = await this.categoryRepository.findBy({
                id: In(payload.categoryIds),
            });
        }
        return this.productRepository.save(product);
    }

    async removeCategoryByProductId(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['categories'],
        });
        product.categories = product.categories.filter(
            ({ id }) => id !== categoryId,
        );

        return await this.productRepository.save(product);
    }
    async addCategoryByProductId(productId: number, categoryId: number) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
            relations: ['categories'],
        });
        product.categories = [
            ...product.categories,
            await this.categoryRepository.findOne({
                where: { id: categoryId },
            }),
        ];

        return await this.productRepository.save(product);
    }

    async delete(id: number) {
        const product = await this.productRepository.findOne({
            where: { id },
        });
        if (!product) {
            throw new NotFoundException(`Product ${id} not found!`);
        }
        return await this.productRepository.delete(id);
    }
}
