import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAccountQuery } from './get-account.query';
import { EventStoreService } from 'src/modules/cqrs-event-sourcing';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BankAccount } from '../bank-account.entity';

@QueryHandler(GetAccountQuery)
export class GetAccountQueryHandler implements IQueryHandler<GetAccountQuery> {
  constructor(
    // private readonly eventStore: EventStoreService,
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly readModel: Repository<BankAccount>,
  ) {}

  async execute(query: GetAccountQuery): Promise<any> {
    let account = await this.readModel.findOne({
      where: { id: query.id },
    });

    return account;
  }
}
