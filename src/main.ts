import '../env/env.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationFilter } from './shared/filters/validation.filter';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from './shared/exceptions/validation.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory(errors: ValidationError[]) {
        return new ValidationException(errors);
      },
    }),
  );
  if (configService.get<string>('ENV') == 'DEVELOP') {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('NestJS Boilerplate with RBAC and Permissions')
      .setDescription('API Specifications')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerOptions, {
      ignoreGlobalPrefix: false,
    });
    SwaggerModule.setup('api/v1/docs', app, document);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
