import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAccountQuery } from './get-account.query';
import { EventStoreService } from 'src/modules/cqrs/cqrs-event-sourcing';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BankAccountEntity } from '../bank-account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(GetAccountQuery)
export class GetAccountQueryHandler implements IQueryHandler<GetAccountQuery> {
  constructor(
    // private readonly eventStore: EventStoreService,
    @InjectRepository(BankAccountEntity)
    private readonly readModel: Repository<BankAccountEntity>,
  ) {}

  async execute(query: GetAccountQuery): Promise<any> {
    let account = await this.readModel.findOne({
      where: { id: query.id },
    });

    return account;
  }
}
