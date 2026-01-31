import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { Inject } from '@nestjs/common';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly postRepository: Repository<Post>,
  ) {}

  async execute(command: CreatePostCommand): Promise<any> {
    // const { title, body }  = command;
    return this.postRepository.save(command);
  }
}
