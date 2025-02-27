import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from 'src/products/entities/brand.entity';
import { createBrandDTO, updateBrandDTO } from 'src/products/dtos/brands.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    ) {}

    counterId = 0;

    findAll() {
        return this.brandRepository.find();
    }

    async findOne(id: number) {
        const brand = await this.brandRepository.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!brand) {
            throw new NotFoundException(`Product ${id} not found!`);
        }
        return brand;
    }

    async create(payload: createBrandDTO) {
        const newProduct = this.brandRepository.create(payload);
        return await this.brandRepository.save(newProduct);
    }

    async update(id: number, payload: updateBrandDTO) {
        const brand = await this.brandRepository.findOne({
            where: { id },
        });
        this.brandRepository.merge(brand, payload);
        return await this.brandRepository.save(brand);
    }

    async delete(id: number) {
        const brand = await this.brandRepository.findOne({
            where: { id },
        });
        if (!brand) {
            throw new NotFoundException(`Brand ${id} not found!`);
        }
        return await this.brandRepository.delete(id);
    }
}
