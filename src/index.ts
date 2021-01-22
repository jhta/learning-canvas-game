import Square from "./Square";
import Animator from "./Animator";

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;

function init() {
  canvas = <HTMLCanvasElement>document.getElementById("canvas");
  context = canvas.getContext("2d");
  if (!context) return;

  const square = new Square(context, 50, 30);
  const animator = new Animator(square);
  animator.start();
}

init();
// window.onload = init;
