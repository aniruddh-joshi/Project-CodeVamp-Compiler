export interface ExecutionContext {
  output: string[];
  onInput?: (value: string) => void;
}

export interface CodeExecutor {
  execute(code: string, context: ExecutionContext): Promise<void>;
}