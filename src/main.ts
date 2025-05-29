import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });

    app.useGlobalPipes(new ZodValidationPipe());

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
