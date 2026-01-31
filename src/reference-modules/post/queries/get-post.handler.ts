import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostQuery } from './get-post.query';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';

@QueryHandler(GetPostQuery)
export class GetPostQueryHandler implements IQueryHandler<GetPostQuery> {
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly postRepository: Repository<Post>,
  ) {}

  async execute(query: GetPostQuery): Promise<any> {
    return this.postRepository.find({ where: { id: query.id } });
  }
}
