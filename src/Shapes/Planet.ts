import { Circle } from '../libgfx/Circle';

export class Planet extends Circle {
  public vx = 0;
  public vy = 0;

  public distance(other: Circle): number {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }

}
