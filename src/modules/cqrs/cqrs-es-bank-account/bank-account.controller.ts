import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OpenAccountCommand } from './commands/bank-account.command';
import { DepositToAccountCommand } from './commands/deposit-to-account.command';
import { GetAccountQuery } from './queries/get-account.query';

@Controller('bank-account')
export class BankAccountControlller {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/create')
  async create(@Body() dto: any) {
    await this.commandBus.execute(
      new OpenAccountCommand(dto.accountId, dto.initialBalance),
    );

    return { message: 'Account opened successfully' };
  }

  @Post('/deposit')
  async deposit(@Body() dto: any) {
    await this.commandBus.execute(
      new DepositToAccountCommand(dto.accountId, dto.amount),
    );

    return { message: 'Deposit successful' };
  }

  @Get('/details/:id')
  async getAccount(@Param('id') id: string) {
    await this.queryBus.execute(new GetAccountQuery(id));
  }
}
