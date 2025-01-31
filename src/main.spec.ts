import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrap } from './main'; // Or wherever your function is defined

// 1. Mock NestFactory
jest.mock('@nestjs/core', () => ({
    NestFactory: {
        create: jest.fn(),
    },
}));

describe('bootstrap', () => {
    it('should call NestFactory and listen on the expected port', async () => {
        // 2. Create a mock for the Nest app instance:
        const mockApp = {
            listen: jest.fn(),
        };

        // 3. Tell Jest that whenever NestFactory.create() is called, it resolves to our mock.
        (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);

        // 4. Call the actual bootstrap function
        await bootstrap();

        // 5. Verify that NestFactory.create() was called with the AppModule
        expect(NestFactory.create).toHaveBeenCalledWith(AppModule);

        // 6. Verify that "listen" was called with the correct port
        //    adjust to your actual port or read from your env mock
        expect(mockApp?.listen).toHaveBeenCalledWith('3001');
    });
});
