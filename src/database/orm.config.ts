import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { buildTypeOrmOptions } from './database.util';

const config: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    buildTypeOrmOptions({
      DB_TYPE: configService.get('DB_TYPE'),
      DB_HOST: configService.get('DB_HOST'),
      DB_PORT: String(configService.get('DB_PORT')),
      DB_USERNAME: configService.get('DB_USERNAME'),
      DB_PASSWORD: configService.get('DB_PASSWORD'),
      DB_DATABASE: configService.get('DB_DATABASE'),
    }),
};

export = config;
