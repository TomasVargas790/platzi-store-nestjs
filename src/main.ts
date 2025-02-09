import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './utils/env';
import { ValidationPipe } from '@nestjs/common';

const {
    api: { port },
} = env;

export async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(port);
}
bootstrap();
