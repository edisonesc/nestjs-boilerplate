export class OpenAccountCommand {
  constructor(
    public readonly accountId: string,
    public readonly initialBalance: number,
  ) {}
}
