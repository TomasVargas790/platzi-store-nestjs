import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './utils/env';

const {
    api: { port },
} = env;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(port);
}
bootstrap();
