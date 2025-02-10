import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from 'src/products/entities/brand.entity';
import { createBrandDTO, updateBrandDTO } from 'src/products/dtos/brands.dto';
@Injectable()
export class BrandsService {
    private brands: Brand[] = [
        {
            id: 1,
            name: 'PC',
        },
    ];

    counterId = 0;

    findAll() {
        return this.brands;
    }

    findOne(id: number) {
        const product = this.brands.find((p) => p.id === id);
        if (!product) {
            throw new NotFoundException(`Brand ${id} not found!`);
        }
        return product;
    }

    create(payload: createBrandDTO) {
        this.counterId++;

        const newBrand = {
            id: this.counterId,
            ...payload,
        } as Brand;

        this.brands = [...this.brands, newBrand];
        return newBrand;
    }

    update(id: number, payload: updateBrandDTO) {
        this.brands = this.brands.map((p) =>
            p.id === id ? { ...p, ...(payload as unknown as Brand) } : { ...p },
        );
        return this.brands.find((p) => p.id === id);
    }

    delete(id: number) {
        const newBrands = this.brands.filter((p) => p.id !== id);
        if (this.brands.length === newBrands.length) {
            throw new NotFoundException(`Brand ${id} not found!`);
        }
        this.brands = [...newBrands];

        return id;
    }
}
