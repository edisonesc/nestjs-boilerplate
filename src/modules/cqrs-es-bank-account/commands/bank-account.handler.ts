import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OpenAccountCommand } from './bank-account.command';
import { EventStore, EventStoreService } from 'src/modules/cqrs-event-sourcing';
import { BankAccountAggregate } from '../aggregates/bank-account.aggregate';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler implements ICommandHandler<OpenAccountCommand> {
  constructor(private readonly eventStore: EventStoreService) {}

  async execute(command: OpenAccountCommand): Promise<void> {
    const account = new BankAccountAggregate(command.accountId);
    account.openAccount(command.initialBalance);
    await this.eventStore.save(account);
  }
}
