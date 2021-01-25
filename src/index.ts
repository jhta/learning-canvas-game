import { createGirl } from "./entities/girl";
import Animator from "./Animator";
import squareControls from "./controls/square";
import { loadImage } from "./loaders";
import Vector from "./Vector";

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;

async function init() {
  canvas = <HTMLCanvasElement>document.getElementById("canvas");
  context = canvas.getContext("2d");
  if (!context) return;

  const image = await loadImage(
    "https://image.shutterstock.com/z/stock-vector-game-kits-adventure-design-character-sprite-female-spy-wear-singlet-1727548357.jpg"
  );

  const spriteWidth = 200;
  const spriteHeight = 200;
  const spriteX = 100;
  const spriteY = 100;
  const contextX = 100;
  const contextY = 100;
  // context.drawImage(
  //   image,
  //   spriteX,
  //   spriteY,
  //   spriteWidth,
  //   spriteHeight,
  //   contextX,
  //   contextY,
  //   spriteWidth,
  //   spriteHeight
  // );
  console.log("the image", image);
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
