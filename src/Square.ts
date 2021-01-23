import Vector from "./Vector";
import { easeLinear } from "./easing";
import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTION } from "./constants";
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
  public direction: DIRECTION = DIRECTION.right;
  public moving: boolean = false;
  public jumping: boolean = false;
  private drawed: boolean = false;
  private jumpStartedTime: number = 0;
  private isJumping: boolean = false;

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
      y: 370
    };
  }

  draw() {
    // Clear the canvas
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

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

  update(timePassed: number) {
    if (!this.drawed) {
      this.draw();
      this.drawed = true;
      return;
    }
    if (!this.moving && !this.jumping && !this.isJumping) return;

    if (this.jumping) {
      this.jumping = false;
      this.jumpStartedTime = new Date().getTime();
      this.isJumping = true;
    }

    if (
      this.isJumping &&
      Math.abs(this.jumpStartedTime - new Date().getTime()) < 680
    ) {
      if (this.position.y <= 370) {
        this.position.y += -this.velocity.y;
        this.velocity.y -= GRAVITY;
      } else {
        this.position.y = 370;
        this.velocity.y = 20;
      }
      if (this.direction === DIRECTION.left) {
        if (this.position.x <= 0) {
          this.draw();
          return;
        }
        this.position.x -= this.velocity.x;
      } else {
        if (this.position.x >= CANVAS_WIDTH - this.width) {
          this.draw();
          return;
        }
        this.position.x += this.velocity.x;
      }
      this.draw();
      return;
    } else {
      this.isJumping = false;
      this.velocity.y = 20;
    }

    if (this.moving) {
      if (this.direction === DIRECTION.left) {
        if (this.position.x <= 0) {
          this.draw();
          return;
        }
        this.position.x -= this.velocity.x;
      } else {
        if (this.position.x >= CANVAS_WIDTH - this.width) {
          this.draw();
          return;
        }
        this.position.x += this.velocity.x;
      }
      // this.draw();
      // return;
    }

    // this.position.x += this.velocity.x;
    // this.position.y += -this.velocity.y;
    // this.velocity.y -= GRAVITY;
    // console.log(this.position.x);
    this.draw();
  }
}
