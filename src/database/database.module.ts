import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    providers: [
        {
            useValue: '12345',
            provide: 'API_KEY',
        },
    ],
    exports: ['API_KEY'],
})
export class DatabaseModule {}
