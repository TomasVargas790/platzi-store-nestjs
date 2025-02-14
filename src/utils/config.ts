import { registerAs } from '@nestjs/config';
export default registerAs('config', () => ({
    database: {
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },
    postgres: {
        name: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        port: Number(process.env.POSTGRES_PORT ?? 5432),
        host: process.env.POSTGRES_HOST,
    },
    apiKey: process.env.API_KEY,
}));
