import { AggregateRoot, DomainEvent } from 'src/modules/cqrs-event-sourcing';
import {
  AccountOpenedEvent,
  MoneyDepositedEvent,
} from '../events/bank-account.events';

//
export class BankAccountAggregate extends AggregateRoot {
  private balance: number = 0;
  private isOpen: boolean = false;

  openAccount(initialBalance: number): void {
    this.applyEvent(new AccountOpenedEvent(this.id, initialBalance));
  }

  deposit(amount: number): void {
    this.applyEvent(new MoneyDepositedEvent(this.id, amount));
  }

  protected apply(event: DomainEvent): void {
    if (event instanceof AccountOpenedEvent) {
      this.balance = event.initialBalance;
      this.isOpen = true;
    } else if (event instanceof MoneyDepositedEvent) {
      this.balance += event.amount;
    }
  }

  getBalance(): number {
    return this.balance;
  }
}
