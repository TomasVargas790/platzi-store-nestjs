import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return create object', () => {
        expect(
            controller.create({
                name: 'test',
                password: 'grandetuco1',
                username: 'vargastomas2003@gmail.com',
            }),
        ).toHaveProperty('object', 'users');
    });

    it('should return getAll', () => {
        expect(controller.getAll()).toHaveProperty('object', 'users');
    });
});
