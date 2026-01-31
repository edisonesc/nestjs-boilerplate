import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import { PostController } from './post.controller';
import { CreatePostHandler } from './commands/create-post.handler';
import { GetPostQueryHandler } from './queries/get-post.handler';
import { GetPostsQueryHandler } from './queries/get-posts.handler';
import { DataSource } from 'typeorm';
import { Post } from './post.entity';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [PostController],
  providers: [
    {
      provide: 'POST_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
      inject: ['DATA_SOURCE'],
    },
    CreatePostHandler,
    GetPostQueryHandler,
    GetPostsQueryHandler,
  ],
})
export class PostModule {}
