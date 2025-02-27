import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';

describe('CategoriesController', () => {
    let controller: CategoriesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoriesController],
        }).compile();

        controller = module.get<CategoriesController>(CategoriesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return create object', () => {
        expect(controller.create({ name: 'electronics' })).toHaveProperty(
            'object',
            'categories',
        );
    });

    it('should return getAll', () => {
        expect(controller.getAll()).toHaveProperty('object', 'categories');
    });
});
