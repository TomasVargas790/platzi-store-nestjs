import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { lastValueFrom } from 'rxjs';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { environment } from '@utils/environments';
import config from '@utils/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: environment[process.env.NODE_ENV || 'dev'],
            isGlobal: true,
            load: [config],
            validationSchema: Joi.object({
                API_KEY: Joi.number().required().positive(),
                DB_NAME: Joi.string().required(),
                DB_PORT: Joi.string().required(),
            }),
        }),
        ProductsModule,
        UsersModule,
        HttpModule,
        DatabaseModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'TASKS',
            useFactory: async (http: HttpService) => {
                const request = http.get(
                    'https://jsonplaceholder.typicode.com/todos',
                );
                return (await lastValueFrom(request)).data;
            },
            inject: [HttpService],
        },
    ],
})
export class AppModule {}
