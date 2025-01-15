import { ExecutionContext } from './types';
import { BaseExecutor } from './BaseExecutor';

export class CompiledLanguageExecutor extends BaseExecutor {
  private variables: Map<string, string> = new Map();
  private inputBuffer: string[] = [];
  private inputIndex: number = 0;

  constructor(private language: string) {
    super();
  }

  async execute(code: string, context: ExecutionContext): Promise<void> {
    try {
      // Reset state
      this.variables.clear();
      this.inputBuffer = [];
      this.inputIndex = 0;

      const lines = code.split('\n');
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine) {
          await this.executeLine(trimmedLine, context);
        }
      }
    } finally {
      this.cleanup();
    }
  }

  private async executeLine(line: string, context: ExecutionContext): Promise<void> {
    // Handle variable declarations
    if (this.isVariableDeclaration(line)) {
      this.handleVariableDeclaration(line);
      return;
    }

    // Handle input operations
    if (this.isInputOperation(line)) {
      await this.handleInputOperation(line, context);
      return;
    }

    // Handle output operations
    if (this.isOutputOperation(line)) {
      await this.handleOutputOperation(line, context);
      return;
    }

    // Handle assignments
    if (this.isAssignment(line)) {
      this.handleAssignment(line);
      return;
    }
  }

  private isVariableDeclaration(line: string): boolean {
    return /^\s*(int|float|double|char|string)\s+\w+(\s*,\s*\w+)*\s*(;|=)/.test(line);
  }

  private handleVariableDeclaration(line: string) {
    const match = line.match(/(\w+)\s+(\w+)/);
    if (match) {
      const [, , varName] = match;
      this.variables.set(varName, '0');
    }
  }

  private isInputOperation(line: string): boolean {
    return line.includes('cin >>') || line.includes('scanf');
  }

  private async handleInputOperation(line: string, context: ExecutionContext) {
    const variables = line.match(/>>?\s*(\w+)/g)?.map(v => v.replace(/>>?\s*/, '')) || [];
    
    for (const varName of variables) {
      const prompt = `Enter value for ${varName}: `;
      const input = await this.handleInput(prompt);
      this.variables.set(varName, input);
      context.output.push(`${prompt}${input}`);
    }
  }

  private isOutputOperation(line: string): boolean {
    return line.includes('cout <<') || line.includes('printf');
  }

  private async handleOutputOperation(line: string, context: ExecutionContext) {
    let output = '';
    
    if (line.includes('cout <<')) {
      const parts = line.split('<<').slice(1);
      for (const part of parts) {
        const trimmed = part.trim().replace(/;$/, '');
        if (trimmed.startsWith('"')) {
          output += trimmed.slice(1, -1);
        } else {
          const varName = trimmed;
          output += this.variables.get(varName) || '';
        }
      }
    } else if (line.includes('printf')) {
      // Handle printf format
      const match = line.match(/printf\s*\("([^"]*)"/);
      if (match) {
        output = match[1];
        // Replace format specifiers with variable values
        output = output.replace(/%d|%f|%s/g, () => {
          const nextVar = Array.from(this.variables.values())[this.inputIndex++];
          return nextVar || '';
        });
      }
    }

    if (output) {
      context.output.push(output);
    }
  }

  private isAssignment(line: string): boolean {
    return /^\s*\w+\s*=/.test(line);
  }

  private handleAssignment(line: string) {
    const [varName, expression] = line.split('=').map(part => part.trim());
    if (varName && expression) {
      // Handle basic arithmetic
      const result = this.evaluateExpression(expression);
      this.variables.set(varName, result.toString());
    }
  }

  private evaluateExpression(expression: string): number {
    // Replace variables with their values
    const evalExpr = expression.replace(/\w+/g, match => {
      const value = this.variables.get(match);
      return value !== undefined ? value : match;
    });
    
    try {
      // Safe evaluation of basic arithmetic
      return Function(`"use strict"; return (${evalExpr.replace(/[^0-9+\-*/\s.()]/g, '')})`)();
    } catch {
      return 0;
    }
  }
}