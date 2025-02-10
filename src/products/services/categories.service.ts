import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from 'src/products/entities/category.entity';
import {
    createCategoryDTO,
    updateCategoryDTO,
} from 'src/products/dtos/categories.dto';
@Injectable()
export class CategoriesService {
    private categories: Category[] = [
        {
            id: 1,
            name: 'Electronics',
        },
    ];

    counterId = 0;

    findAll() {
        return this.categories;
    }

    findOne(id: number) {
        const category = this.categories.find((p) => p.id === id);
        if (!category) {
            throw new NotFoundException(`Category ${id} not found!`);
        }
        return category;
    }

    create(payload: createCategoryDTO) {
        this.counterId++;

        const newCategory = {
            id: this.counterId,
            ...payload,
        } as Category;

        this.categories = [...this.categories, newCategory];
        return newCategory;
    }

    update(id: number, payload: updateCategoryDTO) {
        this.categories = this.categories.map((p) =>
            p.id === id
                ? { ...p, ...(payload as unknown as Category) }
                : { ...p },
        );
        return this.categories.find((p) => p.id === id);
    }

    delete(id: number) {
        const newCategories = this.categories.filter((p) => p.id !== id);
        if (this.categories.length === newCategories.length) {
            throw new NotFoundException(`Category ${id} not found!`);
        }
        this.categories = [...newCategories];

        return id;
    }
}
