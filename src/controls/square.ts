import Square from "../Square";
import KeyboardController from "../KeyboardController";
import { KEYS, DIRECTION, KEY_STATE } from "../constants";

export default function addKeyboardFunctionallity(square: Square) {
  const keyboardController = new KeyboardController();

  keyboardController.listen();

  keyboardController.subscribeKey(KEYS.ARROW_UP, (keyState: KEY_STATE) => {
    console.log("key up pressesd");
    if (keyState === KEY_STATE.pressed) {
      square.jumping = true;
    }
  });

  keyboardController.subscribeKey(KEYS.ARROW_LEFT, (keyState: KEY_STATE) => {
    console.log("key left pressesd");
    if (keyState === KEY_STATE.pressed) {
      square.moving = true;
      square.direction = DIRECTION.left;
    } else {
      square.moving = false;
    }
  });

  keyboardController.subscribeKey(KEYS.ARROW_RIGHT, (keyState: KEY_STATE) => {
    console.log("key right");
    if (keyState === KEY_STATE.pressed) {
      square.moving = true;
      square.direction = DIRECTION.right;
    } else {
      square.moving = false;
    }
  });
}
