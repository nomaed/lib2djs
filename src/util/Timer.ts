export class Timer {
  private t: number;
  private callbacks = new Set<Function>();

  constructor(public interval = 25) {
    this.start();
  }

  public start() {
    this.t = setInterval(() => this.run(), this.interval);
  }

  public stop() {
    if (this.t) {
      clearInterval(this.t);
      this.t = undefined;
    }
  }

  public addListener(cb: Function): boolean {
    if (this.callbacks.has(cb)) return false;
    this.callbacks.add(cb);
    return true;
  }

  public removeListener(cb: Function): boolean {
    return this.callbacks.delete(cb);
  }

  private run() {
    if (!this.callbacks.size) return;
    this.callbacks.forEach(cb => cb());
  }
}
