import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { ProductsController } from './products/controllers/products.controller';
import { CategoriesController } from './products/controllers/categories.controller';
import { OrdersController } from './users/controllers/orders.controller';
import { UsersController } from './users/controllers/users.controller';
import { CustomersController } from './users/controllers/customers.controller';
import { BrandsController } from './products/controllers/brands.controller';
import { AppService } from './app.service';

describe('AppModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
    });

    it('should load AppModule correctly', async () => {
        expect(module).toBeDefined();
    });

    it('should have ConfigService as a provider', () => {
        const configService = module.get(ConfigService);
        expect(configService).toBeDefined();
    });

    it('should load all controllers', () => {
        const controllers = [
            AppController,
            ProductsController,
            CategoriesController,
            OrdersController,
            UsersController,
            CustomersController,
            BrandsController,
        ];

        // Attempt to retrieve each controller from the module
        controllers.forEach((controller) => {
            expect(module.get(controller)).toBeDefined();
        });
    });

    it('should have AppService as a provider', () => {
        const service = module.get(AppService);
        expect(service).toBeDefined();
    });

    afterEach(async () => {
        await module.close();
    });
});
