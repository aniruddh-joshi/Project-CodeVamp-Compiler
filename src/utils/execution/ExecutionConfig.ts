export const ExecutionConfig = {
  TIMEOUT: 30000, // 30 seconds
  INPUT_TIMEOUT: 60000, // 60 seconds for input
  MAX_ITERATIONS: 1000000,
  MAX_OUTPUT_LENGTH: 100000,
  MAX_MEMORY_USAGE: 50 * 1024 * 1024,
} as const;

export class ExecutionError extends Error {
  constructor(
    message: string,
    public readonly type: 'timeout' | 'memory' | 'infinite-loop' | 'input-timeout' | 'output-limit'
  ) {
    super(message);
    this.name = 'ExecutionError';
  }
}