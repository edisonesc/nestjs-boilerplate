import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostCommand } from './commands/create-post.command';
import { GetPostQuery } from './queries/get-post.query';
import { GetPostsQuery } from './queries/get-posts.query';

@Controller('posts')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: any) {
    return this.commandBus.execute(new CreatePostCommand(dto.title, dto.body));
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetPostQuery(+id));
  }

  @Get()
  getAll() {
    return this.queryBus.execute(new GetPostsQuery());
  }
}
