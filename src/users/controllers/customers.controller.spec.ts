import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';

describe('CustomersController', () => {
    let controller: CustomersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomersController],
        }).compile();

        controller = module.get<CustomersController>(CustomersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return create object', () => {
        expect(
            controller.create({
                firstName: 'test',
                lastName: 'test',
                email: 'test@test.com',
                phone: '1112341234',
                userId: 1,
            }),
        ).toHaveProperty('object', 'customers');
    });

    it('should return getAll', () => {
        expect(controller.getAll()).toHaveProperty('object', 'customers');
    });
});
