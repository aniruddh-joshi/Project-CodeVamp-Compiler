import { Subject } from './Subject';
import { TimeoutManager } from './TimeoutManager';
import { ExecutionConfig } from './ExecutionConfig';

export class InputManager {
  private inputSubject = new Subject<string>();
  private timeoutManager = new TimeoutManager();
  private isWaitingForInput = false;

  async requestInput(prompt: string): Promise<string> {
    this.isWaitingForInput = true;
    this.inputSubject.notify(prompt);
    
    return this.timeoutManager.withTimeout(
      () => new Promise<string>((resolve) => {
        const handleInput = (input: string) => {
          this.isWaitingForInput = false;
          resolve(input);
        };
        this.inputSubject.subscribe(handleInput);
      }),
      ExecutionConfig.INPUT_TIMEOUT,
      'input-timeout'
    );
  }

  provideInput(input: string) {
    if (this.isWaitingForInput) {
      this.inputSubject.notify(input);
    }
  }

  clear() {
    this.isWaitingForInput = false;
    this.timeoutManager.cleanup();
  }
}