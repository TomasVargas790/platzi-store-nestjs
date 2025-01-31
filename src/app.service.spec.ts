import { AppService } from './app.service';

describe('AppController', () => {
    const appService = new AppService();

    describe('methods', () => {
        it('should return "Hello World!"', () => {
            expect(appService.getHello()).toBe('Hello World!');
        });
    });
});
