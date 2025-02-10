import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
    let controller: ProductsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return create object', () => {
        expect(
            controller.create({
                name: 'test',
                description: 'test',
                image: 'a.com',
                price: 100,
                stock: 20,
            }),
        ).toHaveProperty('object', 'products');
    });

    it('should return getOne', () => {
        const id = 1;
        expect(controller.getProduct(id)).toBeDefined();
    });
});
