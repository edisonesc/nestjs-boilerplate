import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from 'src/shared/enums/env.enum';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { HttpConsoleLoggerInterceptor } from './interceptors/http-console-logger.interceptor';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDev: boolean = config.get<string>('ENV') === NODE_ENV.DEVELOP;
        return {
          transports: isDev
            ? [
                new winston.transports.Console({
                  format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple(),
                  ),
                }),
              ]
            : [
                new winston.transports.Console(),
                new winston.transports.File({
                  filename: 'logs/error.log',
                  level: 'error',
                }),
              ],
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpConsoleLoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [],
})
export class LoggerModule {}
