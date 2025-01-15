import { CodeExecutor, ExecutionContext } from './types';
import { InputManager } from '../execution/InputManager';
import { ResourceMonitor } from '../execution/ResourceMonitor';

export abstract class BaseExecutor implements CodeExecutor {
  protected inputManager: InputManager;
  protected resourceMonitor: ResourceMonitor;

  constructor() {
    this.inputManager = new InputManager();
    this.resourceMonitor = new ResourceMonitor();
  }

  abstract execute(code: string, context: ExecutionContext): Promise<void>;

  protected async handleInput(prompt: string): Promise<string> {
    return this.inputManager.requestInput(prompt);
  }

  protected checkResources(output?: string) {
    this.resourceMonitor.checkIteration();
    if (output) {
      this.resourceMonitor.checkOutput(output);
    }
  }

  protected cleanup() {
    this.inputManager.clear();
  }
}