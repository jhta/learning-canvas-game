import Vector from "./Vector";

interface Sprite {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
}

export default class State {
  states: Map<string, Sprite> = new Map();
  image: HTMLImageElement;
  constructor(image: HTMLImageElement) {
    this.image = image;
  }
  addState(name: string, sprite: Sprite) {
    if (this.states.has(name)) return;
    this.states.set(name, sprite);
  }

  drawState(name: string, context: CanvasRenderingContext2D, position: Vector) {
    if (this.states.has(name)) {
      const sprite = this.states.get(name);
      if (!sprite) return;

      const {
        position: { x, y },
        width,
        height
      } = sprite;

      context.drawImage(
        this.image,
        x,
        y,
        width,
        height,
        position.x,
        position.y,
        width,
        height
      );
    }
  }
}
