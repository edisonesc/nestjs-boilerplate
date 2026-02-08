import { Module } from '@nestjs/common';
import {
  CQRSEventSourcingModule,
  EventStore,
  InMemoryEventStore,
} from '../cqrs-event-sourcing';
import { BankAccountAggregate } from './aggregates/bank-account.aggregate';
import { OpenAccountHandler } from './commands/bank-account.handler';
import { BankAccountControlller } from './bank-account.controller';
import { DataSource } from 'typeorm';
import {
  AccountOpenedEventHandler,
  MoneyDepositedEventHandler,
} from './events/bank-account-events.handler';
import { DepositToAccountCommandHandler } from './commands/deposit-to-account.handler';
import { GetAccountQuery } from './queries/get-account.query';
import { GetAccountQueryHandler } from './queries/get-account.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountEntity } from './bank-account.entity';

@Module({
  imports: [
    CQRSEventSourcingModule.forRoot({
      aggregates: [BankAccountAggregate],
      commandHandlers: [
        OpenAccountHandler,
        DepositToAccountCommandHandler,
        GetAccountQueryHandler,
      ],
      eventHandlers: [AccountOpenedEventHandler, MoneyDepositedEventHandler],
      entities: [BankAccountEntity],
    }),
    // TypeOrmModule.forFeature(),
  ],
  controllers: [BankAccountControlller],
  providers: [
    {
      provide: EventStore,
      useClass: InMemoryEventStore,
    },
  ],
})
export class BankAccountModule {}
