import { DataSourceOptions } from 'typeorm';

export function buildTypeOrmOptions(env: NodeJS.ProcessEnv): DataSourceOptions {
  return {
    type: env.DB_TYPE as any,
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    logger: 'file',
  };
}
