import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DepositToAccountCommand } from './deposit-to-account.command';
import { Repository } from 'typeorm';
import { BankAccount } from '../bank-account.entity';
import { Inject } from '@nestjs/common';
import { BankAccountAggregate } from '../aggregates/bank-account.aggregate';
import { EventStoreService } from 'src/modules/cqrs-event-sourcing';

@CommandHandler(DepositToAccountCommand)
export class DepositToAccountCommandHandler implements ICommandHandler<DepositToAccountCommand> {
  constructor(private readonly eventStore: EventStoreService) {}

  // TODO: update
  async execute(command: DepositToAccountCommand): Promise<any> {
    const account = new BankAccountAggregate(command.accountId);
    account.deposit(command.amount);
    await this.eventStore.save(account);
  }
}
