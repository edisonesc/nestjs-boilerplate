import { ConfigService } from '@nestjs/config';
import { Photo } from 'src/reference-modules/photo/photo.entity';
import { Post } from 'src/reference-modules/post/post.entity';
import { DataSource } from 'typeorm';

export const DATABASE_PROVIDERS = [
  // DB Typorm
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.get<'mysql'>('DB_TYPE') as any,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}', Post, Photo],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
