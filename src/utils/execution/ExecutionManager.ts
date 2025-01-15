import { TimeoutManager } from './TimeoutManager';
import { ResourceMonitor } from './ResourceMonitor';
import { ExecutionConfig } from './ExecutionConfig';
import { CodeSanitizer } from '../security/Sanitizer';
import { ExecutorFactory } from '../executors/ExecutorFactory';

export class ExecutionManager {
  private static timeoutManager = new TimeoutManager();
  private static resourceMonitor = new ResourceMonitor();

  static async execute(
    code: string,
    languageId: string,
    input: string = ''
  ): Promise<string> {
    try {
      this.resourceMonitor.reset();
      const sanitizedCode = CodeSanitizer.sanitize(code);
      
      const context = {
        output: [] as string[],
        async onInput(prompt: string): Promise<string> {
          return new Promise((resolve) => {
            context.output.push(prompt);
            const handleInput = (input: string) => {
              resolve(input);
            };
            if (input) {
              handleInput(input);
            }
          });
        }
      };

      const executor = ExecutorFactory.create(languageId);
      await this.timeoutManager.withTimeout(
        () => executor.execute(sanitizedCode, context),
        ExecutionConfig.TIMEOUT
      );

      return context.output.join('\n');
    } catch (error) {
      if (error instanceof Error) {
        return `Error: ${error.message}`;
      }
      return 'Error: An unexpected error occurred';
    }
  }
}