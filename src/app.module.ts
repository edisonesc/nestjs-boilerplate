import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/cqrs/cqrs-post/post.module';
import { PhotoModule } from './reference-modules/photo/photo.module';
import { BankAccountModule } from './modules/cqrs/cqrs-es-bank-account/bank-account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './database/orm.config';
import { PermissionsModule } from './modules/core/permissions/permissions.module';
import { UsersModule } from './modules/core/user/user.module';

@Module({
  imports: [
    // Environment
    ConfigModule.forRoot({
      envFilePath: './env/env.develop',
      isGlobal: true,
    }),

    // Database
    TypeOrmModule.forRootAsync(config),

    // Core Modules
    UsersModule,

    PermissionsModule, // AutoCRUD

    // Simple Modules
    PhotoModule,

    // CQRS Modules
    PostModule,
    // CQRS with Event Sourcing Modules
    BankAccountModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
