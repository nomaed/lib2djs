import { Scene } from './Scene';

export interface Shape {
  render(scene: Scene): void;
}
