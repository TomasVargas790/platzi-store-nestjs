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
        expect(controller.create()).toHaveProperty('object', 'products');
    });

    it('should return getOne', () => {
        const id = '1';
        expect(controller.getProduct(id).message).toBe(`product ${id}`);
    });

    it('should return getAll', () => {
        const config = [1, 2, 'chevrolet'];
        expect(
            controller.getProducts(
                config[0] as number,
                config[1] as number,
                config[2] as string,
            ).message,
        ).toBe(`limit ${config[0]} offset ${config[1]} brand ${config[2]}`);
    });
});
