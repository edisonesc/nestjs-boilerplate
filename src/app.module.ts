import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { PostModule } from './reference-modules/post/post.module';
import { PhotoModule } from './reference-modules/photo/photo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/env.development',
      isGlobal: true,
    }),
    DatabaseModule,
    // Simple Modules
    PhotoModule,
    // Auth Modules

    // AutoCRUD Modules
    // CQRS Modules
    PostModule,
    // CQRS with Event Sourcing Modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
