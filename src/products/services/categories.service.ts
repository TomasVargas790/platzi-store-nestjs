import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/products/entities/category.entity';
import {
    createCategoryDTO,
    updateCategoryDTO,
} from 'src/products/dtos/categories.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    counterId = 0;

    findAll() {
        return this.categoryRepository.find();
    }

    async findOne(id: number) {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: ['products'],
        });
        if (!category) {
            throw new NotFoundException(`Category ${id} not found!`);
        }
        return category;
    }

    async create(payload: createCategoryDTO) {
        console.log('aaaaaaaaaaa');

        const newProduct = this.categoryRepository.create(payload);
        return await this.categoryRepository.save(newProduct);
    }

    async update(id: number, payload: updateCategoryDTO) {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });
        this.categoryRepository.merge(category, payload);
        return await this.categoryRepository.save(category);
    }

    async delete(id: number) {
        const category = await this.categoryRepository.findOne({
            where: { id },
        });
        if (!category) {
            throw new NotFoundException(`Category ${id} not found!`);
        }
        return await this.categoryRepository.delete(id);
    }
}
