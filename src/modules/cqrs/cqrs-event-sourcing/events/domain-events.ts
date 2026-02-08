export interface IEvent {
  aggregateId: string;
  eventType: string;
  version: number;
  timestamp: Date;
  data: any;
}

export abstract class DomainEvent implements IEvent {
  public readonly aggregateId: string;
  public readonly eventType: string;
  public readonly version: number;
  public readonly timestamp: Date;
  public readonly data: any;

  constructor(aggregateId: string, data: any, version: number = 1) {
    this.aggregateId = aggregateId;
    this.eventType = this.constructor.name;
    this.version = version;
    this.timestamp = new Date();
    this.data = data;
  }
}
