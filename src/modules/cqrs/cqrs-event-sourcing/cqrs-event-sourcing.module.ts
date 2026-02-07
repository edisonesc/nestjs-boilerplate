import { DynamicModule, Provider, Type } from '@nestjs/common';
import { AggregateRoot } from './domain/aggregate-root';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStore } from './event-store/event-store';
import { EventStoreService } from './event-store/event-store.service';
import { EventPublisher } from './event-store/event-publisher';
import { InMemoryEventStore } from './event-store/in-memory-event-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domain } from 'domain';

export interface CQRSEventSourcingModuleOptions {
  aggregates?: Type<AggregateRoot>[];
  eventHandlers?: Type[];
  commandHandlers?: Type[];
  queryHandlers?: Type[];
  entities?: any[];
}

export class CQRSEventSourcingModule {
  static forRoot(options: CQRSEventSourcingModuleOptions = {}): DynamicModule {
    const {
      aggregates = [],
      eventHandlers = [],
      commandHandlers = [],
      queryHandlers = [],
      entities = [],
    } = options;

    const handlers = [...eventHandlers, ...commandHandlers, ...queryHandlers];

    return {
      module: CQRSEventSourcingModule,
      imports: [CqrsModule, TypeOrmModule.forFeature([Domain, ...entities])],
      providers: [
        {
          provide: EventStore,
          useClass: InMemoryEventStore,
        },
        EventStoreService,
        EventPublisher,
        ...aggregates,
        ...handlers,
      ],
      exports: [EventStore, EventStoreService, EventPublisher, CqrsModule],
    };
  }
}
