export class Subject<T> {
  private observers: ((value: T) => void)[] = [];

  subscribe(observer: (value: T) => void) {
    this.observers.push(observer);
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer);
    };
  }

  notify(value: T) {
    this.observers.forEach(observer => observer(value));
  }
}