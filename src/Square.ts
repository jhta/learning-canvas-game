import Vector from "./Vector";
import { easeLinear } from "./easing";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";

const GRAVITY = 1;

export default class Square {
  private readonly context: CanvasRenderingContext2D;
  private readonly width: number;
  private readonly height: number;
  position: Vector;
  private velocity: Vector = {
    x: 8,
    y: 20
  };

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.position = {
      x: 0,
      y: 400
    };
  }

  draw() {
    // Clear the canvas
    this.context.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);

    // Fill with red
    this.context.fillStyle = "#ff8080";

    // Draw a rectangle on the canvas
    this.context.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += -this.velocity.y;
    this.velocity.y -= GRAVITY;
    console.log(this.position.x);
    this.draw();
  }
}
