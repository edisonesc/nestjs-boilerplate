import { DomainEvent } from '../events/domain-events';

export abstract class AggregateRoot {
  private _id: string;
  private _version: number = 0;
  private _uncommittedEvents: DomainEvent[] = [];

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get version(): number {
    return this._version;
  }

  get uncommittedEvents(): DomainEvent[] {
    return this._uncommittedEvents;
  }

  protected applyEvent(event: DomainEvent, isNew: boolean = true): void {
    this.apply(event);

    if (isNew) {
      this._uncommittedEvents.push(event);
    }

    this._version++;
  }

  public loadFromHistory(events: DomainEvent[]): void {
    events.forEach((event) => {
      this.applyEvent(event);
      this._version++;
    });
  }

  public markEventsAsComitted(): void {
    this._uncommittedEvents = [];
  }

  protected abstract apply(event: DomainEvent): void;
}
