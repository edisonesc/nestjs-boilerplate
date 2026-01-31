import { CommandHandler } from '@nestjs/cqrs';
import { EventStoreRepository } from '../event-store/review.store';
import { SubmitRequestCommand } from './review.command';

@CommandHandler(SubmitRequestCommand)
export class SubmitRequestHandler {
  constructor(private readonly store: EventStoreRepository) {}

  async execute(command: SubmitRequestCommand) {
    const aggregate = await this.store.load(command.requestId);
    aggregate.submit();
    await this.store.save(command.requestId, aggregate);
  }
}
