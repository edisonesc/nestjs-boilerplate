import { request } from 'supertest';

export class SubmitRequestCommand {
  constructor(public readonly requestId: string) {}
}

export class StartReviewCommand {
  constructor(
    public readonly requestId: string,
    public readonly reviewerId: string,
  ) {}
}

export class ApproveRequestCommand {
  constructor(
    public readonly requestId: string,
    public readonly reviewerId: string,
  ) {}
}

export class RejectRequestCommand {
  constructor(
    public readonly requestId: string,
    public readonly reviewerId: string,
    public readonly reason: string,
  ) {}
}

export class ResubmitRequestCommand {
  constructor(public readonly requestId: string) {}
}
