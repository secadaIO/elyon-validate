export interface Adapter {
  name: string;
  invoke(input: string): Promise<string>;
}
