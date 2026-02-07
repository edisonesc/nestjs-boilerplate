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
import { BankAccount } from './bank-account.entity';
import {
  AccountOpenedEventHandler,
  MoneyDepositedEventHandler,
} from './events/bank-account-events.handler';
import { DatabaseModule } from '../database/database.module';
import { DepositToAccountCommandHandler } from './commands/deposit-to-account.handler';
import { GetAccountQuery } from './queries/get-account.query';
import { GetAccountQueryHandler } from './queries/get-account.handler';

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
      repositories: [
        {
          provide: 'BANK_ACCOUNT_REPOSITORY',
          useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(BankAccount),
          inject: ['DATA_SOURCE'],
        },
      ],
    }),
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
