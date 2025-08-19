export interface Command {
  name: string;
  description: string;
  run: (args: string[], ctx: any) => Promise<void>;
}
