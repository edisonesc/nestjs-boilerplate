import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { GetPostsQuery } from './get-posts.query';

@QueryHandler(GetPostsQuery)
export class GetPostsQueryHandler implements IQueryHandler<GetPostsQuery> {
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly postRepository: Repository<Post>,
  ) {}

  async execute(query: GetPostsQuery): Promise<any> {
    return this.postRepository.find();
  }
}
