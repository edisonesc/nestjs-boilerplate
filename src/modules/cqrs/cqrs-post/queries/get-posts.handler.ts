import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from '../post.entity';
import { GetPostsQuery } from './get-posts.query';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(GetPostsQuery)
export class GetPostsQueryHandler implements IQueryHandler<GetPostsQuery> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async execute(query: GetPostsQuery): Promise<any> {
    return this.postRepository.find();
  }
}
