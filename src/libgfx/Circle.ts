import { Shape } from './Shape';

const ANGLE_END = Math.PI * 2;

export class Circle implements Shape {
  constructor(
    public x?: number,
    public y?: number,
    public r?: number,
    public strokeColor = '#000',
    public fillColor?: string
  ) { }

  public render(ctx: CanvasRenderingContext2D) {
    if (!this.r) return;
    ctx.beginPath();
    if (this.strokeColor) ctx.strokeStyle = this.strokeColor;
    if (this.fillColor) ctx.fillStyle = this.fillColor;
    ctx.arc(this.x, this.y, this.r, 0, ANGLE_END);
    if (this.fillColor) ctx.fill();
    if (this.strokeColor) ctx.stroke();
  }
}
