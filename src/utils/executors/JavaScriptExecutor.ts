import { ExecutionContext } from './types';
import { BaseExecutor } from './BaseExecutor';

export class JavaScriptExecutor extends BaseExecutor {
  async execute(code: string, context: ExecutionContext): Promise<void> {
    const originalConsole = console.log;
    const originalPrompt = window.prompt;

    try {
      console.log = (...args) => {
        context.output.push(
          args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ')
        );
      };

      window.prompt = async (message) => {
        const input = await this.handleInput(message ?? 'Input:');
        context.output.push(`> ${input}`);
        return input;
      };

      await eval(`(async () => { ${code} })()`);
    } finally {
      console.log = originalConsole;
      window.prompt = originalPrompt;
      this.cleanup();
    }
  }
}