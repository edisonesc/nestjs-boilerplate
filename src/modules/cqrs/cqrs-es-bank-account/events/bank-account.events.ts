import { DomainEvent } from 'src/modules/cqrs/cqrs-event-sourcing';

export class AccountOpenedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly initialBalance: number,
  ) {
    super(aggregateId, { initialBalance });
  }
}

export class MoneyDepositedEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly amount: number,
  ) {
    super(aggregateId, { amount });
  }
}
