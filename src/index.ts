import { createGirl } from "./entities/girl";
import Animator from "./Animator";
import squareControls from "./controls/square";

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;

async function init() {
  canvas = <HTMLCanvasElement>document.getElementById("canvas");
  context = canvas.getContext("2d");
  if (!context) return;

  const girl = await createGirl();

  console.log("girl", girl);
  // const square = new Square(context, 50, 30);
  squareControls(girl);
  const cb = (timePassed: number) => {
    if (context) {
      girl.update(context, timePassed);
    }
  };

  const animator = new Animator(cb, 1 / 60);
  animator.start();
}

init().then(() => console.log("loaded"));
// window.onload = init;
