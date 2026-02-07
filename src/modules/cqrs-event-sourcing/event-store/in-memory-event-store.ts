import { ConflictException, Injectable } from '@nestjs/common';
import { DomainEvent } from '../events/domain-events';
import { EventStore, EventStreamSlice } from './event-store';

interface StoredEvent {
  aggregateId: string;
  event: DomainEvent;
  globalPosition: number;
}

@Injectable()
export class InMemoryEventStore extends EventStore {
  private events: Map<string, DomainEvent[]> = new Map();
  private allEvents: StoredEvent[] = [];
  private globalPosition: number = 0;

  async saveEvents(
    aggregateId: string,
    events: DomainEvent[],
    expectedVersion: number,
  ): Promise<void> {
    const existingEvents = this.events.get(aggregateId) || [];
    const currentVersion = existingEvents.length;

    // Optimistic concurrency check
    if (currentVersion !== expectedVersion) {
      throw new ConflictException(
        `Concurrency conflict: Expected version ${expectedVersion}, but current version is ${currentVersion}`,
      );
    }

    // Stored events
    const updatedEvents = [...existingEvents, ...events];
    this.events.set(aggregateId, updatedEvents);

    // Store in global event stream
    events.forEach((event) => {
      this.allEvents.push({
        aggregateId,
        event,
        globalPosition: this.globalPosition++,
      });
    });
  }

  async getEvents(
    aggregateId: string,
    fromVersion: number = 0,
  ): Promise<EventStreamSlice> {
    const events = this.events.get(aggregateId) || [];
    const filteredEvents = events.slice(fromVersion);

    return {
      events: filteredEvents,
      currentVersion: events.length,
    };
  }

  async getAllEvents(
    fromPosition: number = 0,
    limit: number = 100,
  ): Promise<DomainEvent[]> {
    return this.allEvents
      .filter((e) => e.globalPosition >= fromPosition)
      .slice(0, limit)
      .map((e) => e.event);
  }

  // Util
  clear(): void {
    this.events.clear();
    this.allEvents = [];
    this.globalPosition = 0;
  }
}
