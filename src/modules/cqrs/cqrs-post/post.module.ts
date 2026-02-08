import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { CreatePostHandler } from './commands/create-post.handler';
import { GetPostQueryHandler } from './queries/get-post.handler';
import { GetPostsQueryHandler } from './queries/get-posts.handler';
import { DataSource } from 'typeorm';
import { PostEntity } from './post.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [
    // {
    //   provide: 'POST_REPOSITORY',
    //   useFactory: (dataSource: DataSource) =>
    //     dataSource.getRepository(PostEntity),
    //   inject: ['DATA_SOURCE'],
    // },
    CreatePostHandler,
    GetPostQueryHandler,
    GetPostsQueryHandler,
  ],
})
export class PostModule {}
