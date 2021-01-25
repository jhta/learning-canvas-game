import Vector from "./Vector";
import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTION } from "./constants";
import State from "./EntityState";
const GRAVITY = 1;

export interface EntityParams {
  width: number;
  height: number;
  state: State;
}

export default class Entity {
  readonly width: number;
  readonly height: number;
  state: State;
  position: Vector = new Vector(0, 0);

  constructor({ width, height, state }: EntityParams) {
    this.width = width;
    this.height = height;
    this.state = state;
  }

  draw(context: CanvasRenderingContext2D) {
    console.log("overwrite draw");
  }

  update(context: CanvasRenderingContext2D, timePassed: number) {
    console.log("overwrite update");
  }
}
