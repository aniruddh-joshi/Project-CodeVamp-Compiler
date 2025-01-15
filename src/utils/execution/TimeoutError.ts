export class TimeoutError extends Error {
  constructor(message: string = 'Code execution timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}