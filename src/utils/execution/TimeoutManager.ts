import { ExecutionError } from './ExecutionConfig';

export class TimeoutManager {
  private timeoutId?: NodeJS.Timeout;

  async withTimeout<T>(
    operation: () => Promise<T>,
    timeout: number,
    errorType: 'timeout' | 'input-timeout' = 'timeout'
  ): Promise<T> {
    return Promise.race([
      operation(),
      new Promise<never>((_, reject) => {
        this.timeoutId = setTimeout(() => {
          const message = errorType === 'timeout' 
            ? 'Execution timed out (10 second limit). Check for infinite loops or long-running operations.'
            : 'Input timeout (30 second limit). No input provided.';
          
          reject(new ExecutionError(message, errorType));
        }, timeout);
      })
    ]).finally(() => this.cleanup());
  }

  cleanup() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}