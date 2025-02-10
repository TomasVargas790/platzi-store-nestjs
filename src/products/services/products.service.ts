import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import {
    createProductDTO,
    updateProductDTO,
} from 'src/products/dtos/products.dto';
@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 1,
            name: 'PC',
            description: 'personal computer',
            price: 10.2,
            image: '',
            stock: 10,
        },
    ];

    counterId = 0;

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new NotFoundException(`Product ${id} not found!`);
        }
        return product;
    }

    create(payload: createProductDTO) {
        this.counterId++;

        const newProduct = {
            id: this.counterId,
            ...payload,
        } as Product;

        this.products = [...this.products, newProduct];
        return newProduct;
    }

    update(id: number, payload: updateProductDTO) {
        this.products = this.products.map((p) =>
            p.id === id
                ? { ...p, ...(payload as unknown as Product) }
                : { ...p },
        );
        return this.products.find((p) => p.id === id);
    }

    delete(id: number) {
        const newProducts = this.products.filter((p) => p.id !== id);
        if (this.products.length === newProducts.length) {
            throw new NotFoundException(`Product ${id} not found!`);
        }
        this.products = [...newProducts];

        return id;
    }
}
