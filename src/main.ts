import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import helmet from 'helmet';
import { ResponseTransformInterceptor } from '@configs/interceptors/response.transform.interceptor';
import { HttpExceptionFilter } from '@configs/filters/http-exception.filter';
import { AllExceptionsFilter } from '@configs/filters/all-exception.filter';
import * as cookieParser from 'cookie-parser';
const compression = require('compression');

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configSerice = app.get(ConfigService);
    const port = +configSerice.get<number>('PORT') || 5174;
    const host = +configSerice.get<number>('HOST') || 'http://localhost';
    const httpAdapterHost = app.get(HttpAdapterHost);

    app.use(helmet());
    app.use(cookieParser());
    app.enableCors();
    app.use(compression());

    app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionsFilter(httpAdapterHost));

    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new ResponseTransformInterceptor());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('The API P0287')
        .setVersion('1.0')
        .addServer(`${host}:${port}`, `Localhost`)
        .addServer(`${host}:${port}`, `Host`)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api-docs', app, document);

    await app.listen(port);
    console.log(`=========== 🕵  Server running on ${host}:${port} ===========‍`);
    console.log(`URL for Swagger [OpenApi]: ${host}:${port}/api-docs`);
}
bootstrap();
