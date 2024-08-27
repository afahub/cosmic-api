import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log'],
  });

  const globalPrefix = 'v1/api';
  app.setGlobalPrefix(globalPrefix);

  // setup swagger docs
  const swagConfig = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'Authorization',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swagConfig);
  SwaggerModule.setup('swagger', app, document, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestHeaders: true,
      basePath: globalPrefix, // Set the base path for Swagger UI
    },
    customSiteTitle: 'API Documentation',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const PORT = process.env.PORT || 8000;
  await app.listen(PORT);
}

bootstrap();
