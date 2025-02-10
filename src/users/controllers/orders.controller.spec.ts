import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { User } from '../entities/user.entity';

describe('OrdersController', () => {
    let controller: OrdersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
        }).compile();

        controller = module.get<OrdersController>(OrdersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return create object', () => {
        expect(
            controller.create({
                date: new Date(),
                products: [],
                user: new User(),
            }),
        ).toHaveProperty('object', 'orders');
    });

    it('should return getAll', () => {
        expect(controller.getAll()).toHaveProperty('object', 'orders');
    });
});
