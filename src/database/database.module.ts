import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '@utils/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],

            useFactory: async (configService: ConfigType<typeof config>) => {
                const {
                    postgres: { host, name, password, port, user },
                } = configService;

                return {
                    type: 'postgres',
                    host,
                    database: name,
                    password,
                    port,
                    username: user,
                };
            },
        }),
    ],
    providers: [
        {
            useValue: '12345',
            provide: 'API_KEY',
        },
    ],
    exports: ['API_KEY', TypeOrmModule],
})
export class DatabaseModule {}
