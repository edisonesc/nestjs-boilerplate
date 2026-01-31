import { AggregateRoot } from '@nestjs/cqrs';
import {
  RequestApprovedEvent,
  RequestResubmittedEvent,
  RequestSubmittedEvent,
  ReviewStartedEvent,
} from '../events/review.event';

export enum ReviewState {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class ReviewRequestAggregate extends AggregateRoot {
  private state = ReviewState.DRAFT;
  private revision = 1;
  private reviewerId?: string;

  submit() {
    if (this.state !== ReviewState.DRAFT) {
      throw new Error('Can only submit from DRAFT');
    }

    this.apply(new RequestSubmittedEvent(this.revision));
  }

  startReview(reviewerId: string) {
    if (this.state !== ReviewState.SUBMITTED) {
      throw new Error('Can only start review from SUBMITED');
    }
    this.apply(new ReviewStartedEvent(this.revision, reviewerId));
  }

  approve(reviewerId: string) {
    if (
      this.state !== ReviewState.IN_REVIEW ||
      this.reviewerId !== reviewerId
    ) {
      throw new Error('Approval not allowed');
    }

    this.apply(new RequestApprovedEvent(this.revision));
  }

  reject(reviewerId: string, reason: string) {
    if (
      this.state !== ReviewState.IN_REVIEW ||
      this.reviewerId !== reviewerId
    ) {
      throw new Error('Rejection not allowed');
    }
  }

  resubmit() {
    if (this.state !== ReviewState.REJECTED) {
      throw new Error('Only rejected request can be resubmitted');
    }
  }

  // events

  onRequestSubmittedEvent() {
    this.state = ReviewState.SUBMITTED;
  }

  onReviewStartedEvent(event: ReviewStartedEvent) {
    this.state = ReviewState.IN_REVIEW;
    this.reviewerId = event.reviewerId;
  }

  onRequestApprovedEvent() {
    this.state == ReviewState.APPROVED;
  }

  onRequestRejectedEvent() {
    this.state = ReviewState.REJECTED;
  }

  onRequestResubmittedEvent(event: RequestResubmittedEvent) {
    this.revision = event.newRevision;
    this.state = ReviewState.DRAFT;
    this.reviewerId = undefined;
  }
}
