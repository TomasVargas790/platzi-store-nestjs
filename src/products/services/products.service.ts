import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import {
    createProductDTO,
    updateProductDTO,
} from 'src/products/dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async findAll() {
        return await this.productRepository.find();
    }

    async findOne(id: number) {
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new NotFoundException(`Product ${id} not found!`);
        }
        return product;
    }

    create(payload: createProductDTO) {
        const newProduct = this.productRepository.create(payload);
        return this.productRepository.save(newProduct);
    }

    async update(id: number, payload: updateProductDTO) {
        const product = await this.productRepository.findOne(id);
        this.productRepository.merge(product, payload);
        return this.productRepository.save(product);
    }

    async delete(id: number) {
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new NotFoundException(`Product ${id} not found!`);
        }
        return await this.productRepository.delete(id);
    }
}
