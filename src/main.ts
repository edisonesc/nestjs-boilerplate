import '../env/env.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api/v1');
  // app.useGlobalFilters(new)
  // app.useGlobalPipes()
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
