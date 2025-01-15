export class ResourceMonitor {
  private startTime: number;
  private iterationCount: number = 0;
  private outputLength: number = 0;

  constructor(private config = {
    maxIterations: 1000000,
    maxOutputLength: 100000,
  }) {
    this.startTime = Date.now();
  }

  checkIteration() {
    this.iterationCount++;
    if (this.iterationCount > this.config.maxIterations) {
      throw new Error('Infinite loop detected');
    }
  }

  checkOutput(output: string) {
    this.outputLength += output.length;
    if (this.outputLength > this.config.maxOutputLength) {
      throw new Error('Output length limit exceeded');
    }
  }

  reset() {
    this.startTime = Date.now();
    this.iterationCount = 0;
    this.outputLength = 0;
  }
}