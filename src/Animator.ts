import Square from "./Square";

let counter = 0;
export default class Animator {
  readonly entity: Square;
  animateProxy: (timestamp: number) => void;

  constructor(square: Square) {
    this.entity = square;
    let oldTimeStamp: number = 0;
    let secondsPassed: number = 0;
    let timePassed: number = 0;

    this.animateProxy = (timeStamp: number) => {
      // console.log("proxi");
      counter++;
      secondsPassed = (timeStamp - oldTimeStamp) / 1000;
      oldTimeStamp = timeStamp;
      timePassed += secondsPassed;

      this.entity.update(timePassed);
      // if (counter < 2000) {
      this.enqueue();
      // }
    };
  }
  enqueue() {
    window.requestAnimationFrame(this.animateProxy);
  }
  start() {
    this.enqueue();
  }
}
