import { Repository } from 'typeorm';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AccountOpenedEvent, MoneyDepositedEvent } from './bank-account.events';
import { BankAccountEntity } from '../bank-account.entity';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@EventsHandler(AccountOpenedEvent)
export class AccountOpenedEventHandler implements IEventHandler<AccountOpenedEvent> {
  constructor(
    @InjectRepository(BankAccountEntity)
    private readonly repository: Repository<BankAccountEntity>,
  ) {}

  async handle(event: AccountOpenedEvent) {
    const readModel = new BankAccountEntity();
    readModel.id = event.aggregateId;
    readModel.balance = event.initialBalance;
    readModel.status = 'open';

    await this.repository.save(readModel);
  }
}

@EventsHandler(MoneyDepositedEvent)
export class MoneyDepositedEventHandler implements IEventHandler<MoneyDepositedEvent> {
  constructor(
    @InjectRepository(BankAccountEntity)
    private readonly repository: Repository<BankAccountEntity>,
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
