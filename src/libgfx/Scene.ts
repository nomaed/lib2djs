import { Shape } from './Shape';

export class Scene {
  public foregroundColor = '#000';

  private shapes: Array<Shape> = [];

  constructor(public ctx: CanvasRenderingContext2D) { }

  public get canvas(): HTMLCanvasElement {
    return this.ctx.canvas;
  }

  public set backgroundColor(color: string) {
    this.canvas.style.backgroundColor = color;
  }

  public get backgroundColor(): string {
    return this.canvas.style.backgroundColor;
  }

  public get width(): number {
    return this.ctx.canvas.clientWidth;
  }

  public get height(): number {
    return this.ctx.canvas.clientHeight;
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  public removeShape(shape: Shape) {
    const idx = this.shapes.indexOf(shape);
    if (idx !== -1) {
      this.shapes.splice(idx, 1);
    }
  }

  public render() {
    // this.clear();
    for (const shape of this.shapes) {
      shape.render(this);
    }
  }
}
