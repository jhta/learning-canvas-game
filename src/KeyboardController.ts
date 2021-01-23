import { EVENTS_TO_LISTEN, KEY_STATE } from "./constants";

export default class KeyboardController {
  keys: Map<number, Function> = new Map();
  keyStates: Map<number, KEY_STATE> = new Map();
  subscribeKey(keyCode: number, cb: Function) {
    if (this.keys.has(keyCode)) return;
    this.keys.set(keyCode, cb);
  }

  private handleEvent(event: KeyboardEvent) {
    const { keyCode, type } = event;
    event.preventDefault();

    const keyState =
      type === "keydown" ? KEY_STATE.pressed : KEY_STATE.released;
    if (this.keyStates.get(keyCode) === keyState) {
      return;
    }

    this.keyStates.set(keyCode, keyState);

    const cb = this.keys.get(keyCode);
    if (cb) cb(keyState);
  }

  listen() {
    (Object as any).values(EVENTS_TO_LISTEN).forEach((eventName: string) => {
      window.addEventListener(eventName, (e) =>
        this.handleEvent(e as KeyboardEvent)
      );
    });
  }
}
