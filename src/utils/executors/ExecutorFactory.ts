import { CodeExecutor } from './types';
import { JavaScriptExecutor } from './JavaScriptExecutor';
import { PythonExecutor } from './PythonExecutor';
import { CompiledLanguageExecutor } from './CompiledLanguageExecutor';

export class ExecutorFactory {
  static create(languageId: string): CodeExecutor {
    switch (languageId) {
      case 'javascript':
        return new JavaScriptExecutor();
      case 'python':
        return new PythonExecutor();
      case 'c':
      case 'cpp':
      case 'java':
        return new CompiledLanguageExecutor(languageId);
      default:
        throw new Error(`Unsupported language: ${languageId}`);
    }
  }
}