import { Injectable } from '@nestjs/common';
import { ReviewRequestAggregate } from '../aggregates/review-request.aggregate';

@Injectable()
export class EventStoreRepository {
  private store = new Map<string, any[]>();

  async load(id: string): Promise<ReviewRequestAggregate> {
    const aggregate = new ReviewRequestAggregate();
    const events = this.store.get(id) ?? [];
    aggregate.loadFromHistory(events);
    return aggregate;
  }

  async save(id: string, aggregate: ReviewRequestAggregate) {
    const events = aggregate.getUncommittedEvents();
    const history = this.store.get(id) ?? [];
    this.store.set(id, [...history, ...events]);

    aggregate.commit();
  }
}
