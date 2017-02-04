import { Timer } from './util/Timer';
import { Shape } from './libgfx/Shape';
import { Circle } from './libgfx/Circle';
import { Scene } from './libgfx/Scene';
import { debounce } from './util/debouce';

const FPS = 100;

let scene: Scene;

export function bootstrap(canvas: HTMLCanvasElement) {
  const timer = new Timer(1000 / FPS);

  scene = new Scene(canvas.getContext('2d'));
  scene.backgroundColor = '#333';
  scene.foregroundColor = 'white';

  scene.addShape(new ResolutionDisplay());
  timer.addListener(() => window.requestAnimationFrame(() => scene.render()));

  window.addEventListener('resize', <EventListener>debounce(() => updateCanvasSize(), 100));
  updateCanvasSize();
}

function updateCanvasSize() {
  const canvas = scene.ctx.canvas;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class ResolutionDisplay implements Shape {
  public render(ctx: CanvasRenderingContext2D) {
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
