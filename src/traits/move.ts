import Girl from "../entities/girl";
import { CANVAS_HEIGHT, CANVAS_WIDTH, DIRECTION } from "../constants";

export class Trait {
  start(entity: Girl, context: CanvasRenderingContext2D) {}
  end() {}
}

export class Move extends Trait {
  start(entity: Girl, context: CanvasRenderingContext2D) {
    console.log("ehhh", entity.direction);
    if (entity.direction === DIRECTION.left) {
      if (entity.position.x <= 0) {
        return;
      }
      entity.position.x -= entity.velocity.x;
    } else {
      if (entity.position.x >= CANVAS_WIDTH - entity.width) {
        return;
      }
      entity.position.x += entity.velocity.x;
    }
    entity.draw(context);
  }
}
