export class DepositToAccountCommand {
  constructor(
    public readonly accountId: string,
    public readonly amount: number,
  ) {}
}
