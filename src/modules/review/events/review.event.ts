export class RequestSubmittedEvent {
  constructor(public readonly revision: number) {}
}

export class ReviewStartedEvent {
  constructor(
    public readonly revision: number,
    public readonly reviewerId: string,
  ) {}
}

export class RequestApprovedEvent {
  constructor(public readonly revision: number) {}
}

export class RequestRejectedEvent {
  constructor(
    public readonly revision: number,
    public readonly reason: string,
  ) {}
}

export class RequestResubmittedEvent {
  constructor(public readonly newRevision: number) {}
}
