export function bootstrap(canvas: HTMLCanvasElement) {

  window.addEventListener('resize', () => {
    updateCanvasSize(canvas);
  });

  updateCanvasSize(canvas);
}

function updateCanvasSize(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  showSize(ctx);
}

function showSize(ctx: CanvasRenderingContext2D) {
  const width = ctx.canvas.clientWidth;
  const height = ctx.canvas.clientHeight;
  const fontSizePx = 12;
  const text = `${width}x${height}`;
  ctx.font = `${fontSizePx}px monospace`;

  ctx.fillStyle = 'rgb(200, 255, 255)';
  ctx.fillRect(0, 0, width, height);

  const textWidth = ctx.measureText(text).width;

  ctx.fillStyle = 'rgba(200, 200, 0, .15)';
  ctx.fillRect(width - textWidth - 8, height - fontSizePx - 8, textWidth + 6, fontSizePx + 6);

  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.strokeRect(width - textWidth - 8, height - fontSizePx - 8, textWidth + 6, fontSizePx + 6);

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillText(text, width - textWidth - 5, height - 7);

}
