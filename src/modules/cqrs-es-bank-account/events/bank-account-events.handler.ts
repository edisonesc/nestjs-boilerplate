import { Repository } from 'typeorm';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountOpenedEvent, MoneyDepositedEvent } from './bank-account.events';
import { BankAccount } from '../bank-account.entity';
import { Inject } from '@nestjs/common';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedEventHandler implements IEventHandler<AccountOpenedEvent> {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly repository: Repository<BankAccount>,
  ) {}

  async handle(event: AccountOpenedEvent) {
    const readModel = new BankAccount();
    readModel.id = event.aggregateId;
    readModel.balance = event.initialBalance;
    readModel.status = 'open';

    await this.repository.save(readModel);
  }
}

@EventsHandler(MoneyDepositedEvent)
export class MoneyDepositedEventHandler implements IEventHandler<MoneyDepositedEvent> {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly repository: Repository<BankAccount>,
  ) {}

  async handle(event: MoneyDepositedEvent) {
    await this.repository.increment(
      { id: event.aggregateId },
      'balance',
      event.amount,
    );

    // await this.repository.update(
    //     {id: event.aggregateId},
    //     {
    //         las
    //     }
    // )
  }
}
