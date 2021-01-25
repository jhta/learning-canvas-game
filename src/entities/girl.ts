import State from "../EntityState";
import Vector from "../Vector";
import Entity from "../Entity";
import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTION } from "../constants";
import { loadImage } from "../loaders";
import { GIRL } from "../sprites/girl";

const GRAVITY = 1;

export interface GirlParams {
  width: number;
  height: number;
  state: State;
}

export default class Girl extends Entity {
  private velocity: Vector = new Vector(8, 20);
  public direction: DIRECTION = DIRECTION.right;
  public moving: boolean = false;
  public jumping: boolean = false;
  private drawed: boolean = false;
  private jumpStartedTime: number = 0;
  private isJumping: boolean = false;

  constructor({ width, height, state }: GirlParams) {
    super({ width, height, state });
    this.position.set(0, 170);
  }

  draw(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.state.drawState("base", context, this.position);
  }

  update(context: CanvasRenderingContext2D, timePassed: number) {
    const draw = () => this.draw(context);
    if (!this.drawed) {
      draw();
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
          draw();
          return;
        }
        this.position.x -= this.velocity.x;
      } else {
        if (this.position.x >= CANVAS_WIDTH - this.width) {
          draw();
          return;
        }
        this.position.x += this.velocity.x;
      }
      draw();
      return;
    } else {
      this.isJumping = false;
      this.velocity.y = 20;
    }

    if (this.moving) {
      if (this.direction === DIRECTION.left) {
        if (this.position.x <= 0) {
          draw();
          return;
        }
        this.position.x -= this.velocity.x;
      } else {
        if (this.position.x >= CANVAS_WIDTH - this.width) {
          draw();
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
    draw();
  }
}

export async function createGirl(): Promise<Girl> {
  const image = await loadImage(GIRL.url);

  const state = new State(image);
  state.addState("base", GIRL.base);

  const girl = new Girl({
    width: GIRL.base.width,
    height: GIRL.base.height,
    state
  });
  return girl;
}
