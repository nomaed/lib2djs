import { Scene } from '../libgfx/Scene';
import { Shape } from '../libgfx/Shape';

export class ResolutionDisplay implements Shape {
  public render(scene: Scene) {
    const ctx = scene.ctx;
    const width = scene.width;
    const height = scene.height;
    const fontSizePx = 12;
    const text = `${width}x${height}`;
    ctx.font = `${fontSizePx}px monospace`;

    const textWidth = ctx.measureText(text).width;

    ctx.fillStyle = 'rgba(200, 200, 0, .15)';
    ctx.fillRect(width - textWidth - 8, height - fontSizePx - 8, textWidth + 6, fontSizePx + 6);

    ctx.strokeStyle = scene.foregroundColor;
    ctx.strokeRect(width - textWidth - 8, height - fontSizePx - 8, textWidth + 6, fontSizePx + 6);

    ctx.fillStyle = scene.foregroundColor;
    ctx.fillText(text, width - textWidth - 5, height - 7);
  }
}
