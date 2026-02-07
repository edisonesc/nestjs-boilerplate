import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DomainEvent } from '../events/domain-events';

@Injectable()
export class EventPublisher {
  constructor(private readonly eventBus: EventBus) {}

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.eventBus.publish(event);
    }
  }

  async publishSingle(event: DomainEvent): Promise<void> {
    await this.eventBus.publish(event);
  }
}
