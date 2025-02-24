import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
    type: 'postgres',
    url: 'postgres://root:123456@localhost:5432/platzi-store',
    synchronize: false,
    migrations: ['src/database/migrations/*.ts'],
    migrationsTableName: 'migrations',
    entities: ['src/**/*.entity.ts'],
});
