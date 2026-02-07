import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { Repository } from 'typeorm';
import { PostEntity } from '../post.entity';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async execute(command: CreatePostCommand): Promise<any> {
    // const { title, body }  = command;
    return this.postRepository.save(command);
  }
}
