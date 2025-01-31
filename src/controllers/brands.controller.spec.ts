import { Test, TestingModule } from '@nestjs/testing';
import { BrandsController } from './brands.controller';

describe('BrandsController', () => {
    let controller: BrandsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BrandsController],
        }).compile();

        controller = module.get<BrandsController>(BrandsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return create object', () => {
        expect(controller.create()).toHaveProperty('object', 'brands');
    });

    it('should return getAll', () => {
        expect(controller.getAll()).toHaveProperty('object', 'brands');
    });
});
