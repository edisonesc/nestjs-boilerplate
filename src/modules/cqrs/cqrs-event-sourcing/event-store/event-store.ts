import { Injectable } from '@nestjs/common';
import { DomainEvent } from '../events/domain-events';

export interface EventStreamSlice {
  events: DomainEvent[];
  currentVersion: number;
}

@Injectable()
export abstract class EventStore {
  abstract saveEvents(
    aggregateId: string,
    events: DomainEvent[],
    expectedVersion: number,
  ): Promise<void>;

  abstract getEvents(
    aggregateId: string,
    fromVersion?: number,
  ): Promise<EventStreamSlice>;

  abstract getAllEvents(
    fromPosition?: number,
    limit?: number,
  ): Promise<DomainEvent[]>;
}
