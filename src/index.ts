import Square from "./Square";
import Animator from "./Animator";
import squareControls from "./controls/square";

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;

function init() {
  canvas = <HTMLCanvasElement>document.getElementById("canvas");
  context = canvas.getContext("2d");
  if (!context) return;

  const square = new Square(context, 50, 30);
  squareControls(square);
  const animator = new Animator(square);
  animator.start();
}

init();
// window.onload = init;
