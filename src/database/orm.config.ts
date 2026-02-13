import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: configService.get<'mysql'>('DB_TYPE') as any,
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
    migrationsRun: false,
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  }),
};

export = config;
