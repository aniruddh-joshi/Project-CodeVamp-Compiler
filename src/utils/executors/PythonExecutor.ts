import { ExecutionContext } from './types';
import { BaseExecutor } from './BaseExecutor';

export class PythonExecutor extends BaseExecutor {
  async execute(code: string, context: ExecutionContext): Promise<void> {
    try {
      const lines = code.split('\n');
      for (const line of lines) {
        await this.executeLine(line.trim(), context);
      }
    } finally {
      this.cleanup();
    }
  }

  private async executeLine(line: string, context: ExecutionContext): Promise<void> {
    if (line.startsWith('input(')) {
      const prompt = this.extractInputPrompt(line);
      const input = await this.handleInput(prompt);
      context.output.push(`> ${input}`);
      return;
    }
    
    if (line.startsWith('print(')) {
      const output = this.extractPrintOutput(line);
      if (output) {
        context.output.push(output);
      }
    }
  }

  private extractInputPrompt(line: string): string {
    const match = line.match(/input\((["'])(.*?)\1\)/);
    return match?.[2] ?? 'Input:';
  }

  private extractPrintOutput(line: string): string | null {
    const match = line.match(/print\((.*)\)/);
    if (!match) return null;

    let content = match[1].trim();
    if (content.startsWith('"') || content.startsWith("'")) {
      content = content.slice(1, -1);
    }

    if (content.includes('f"') || content.includes("f'")) {
      content = content
        .replace(/f["'](.*)["']/, '$1')
        .replace(/\{([^}]+)\}/g, (_, expr) => {
          try {
            return eval(expr);
          } catch {
            return `{${expr}}`;
          }
        });
    }

    return content;
  }
}