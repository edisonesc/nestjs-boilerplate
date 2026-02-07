import { Injectable } from '@nestjs/common';
import { EventStore } from './event-store';
import { AggregateRoot } from '../domain/aggregate-root';
import { EventPublisher } from './event-publisher';

@Injectable()
export class EventStoreService {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async save<T extends AggregateRoot>(
    aggregate: T,
    expectedVersion?: number,
  ): Promise<void> {
    const events = aggregate.uncommittedEvents;
    if (events.length === 0) {
      return;
    }
    const version = expectedVersion ?? aggregate.version - events.length;
    await this.eventStore.saveEvents(aggregate.id, events, version);

    await this.eventPublisher.publish(events);
  }
}
