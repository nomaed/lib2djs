import { Shape } from './libgfx/Shape';
import { Scene } from './libgfx/Scene';
import { Timer } from './util/Timer';
import { Planet } from './Shapes/Planet';
import { ResolutionDisplay } from './Shapes/ResolutionDisplay';
import { debounce } from './util/debouce';

const FPS = 100;
const NUM_PLANETS = 4;
const G = 0.00001;

const planets = new Set<Planet>();
let scene: Scene;
let sceneTimer: Timer;
let animTimer: Timer;

export function bootstrap(canvas: HTMLCanvasElement) {
  sceneTimer = new Timer(1000 / FPS);
  animTimer = new Timer(25);

  scene = new Scene(canvas.getContext('2d'));
  scene.backgroundColor = '#333';
  scene.foregroundColor = 'white';

  scene.addShape(new ResolutionDisplay());
  sceneTimer.addListener(() => window.requestAnimationFrame(() => scene.render()));
  animTimer.addListener(() => {
    console.log('anim');
    animate();
  });

  window.addEventListener('resize', <EventListener>debounce(() => updateCanvasSize(), 100));
  window.addEventListener('click', restart);

  updateCanvasSize();
  restart();
}

function updateCanvasSize() {
  const canvas = scene.ctx.canvas;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function restart() {
  animTimer.stop();
  planets.forEach(p => scene.removeShape(p));
  planets.clear();
  addPlanets();
  animTimer.start();
}

function addPlanets() {
  for (let i = 0; i < NUM_PLANETS; i++) {
    const r = Math.random() * 10;
    const x = Math.random() * (scene.width - (2 * r)) + r;
    const y = Math.random() * (scene.height - (2 * r)) + r;
    const planet = new Planet(x, y, r, 'white');
    planet.vx = Math.random() * 10 - 5;
    planet.vy = Math.random() * 10 - 5;
    planets.add(planet);
  }

  planets.forEach(p => scene.addShape(p));
}

function force(m1: number, m2: number, d: number): number {
  return G * m1 * m2 / d * d;
}

// function accel(m)

function animate() {
  if (!planets.size) return;
  planets.forEach(p1 => {
    planets.forEach(p2 => {
      if (p1 === p2) return;
      const f = force(p1.r, p2.r, p1.distance(p2));
      const dx = (p2.x - p1.x) / p1.r;
      const dy = (p2.y - p1.y) / p1.r;
      p1.vx += f * dx;
      p1.vy += f * dy;
    });
  });

  planets.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
  });
}

