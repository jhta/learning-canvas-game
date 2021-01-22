export function easeLinear(t: number, b: number, c: number, d: number) {
  return (c * t) / d + b;
}

// Trigger init function when the page has loaded
// Example easing functions
// function easeInOutQuint(t, b, c, d) {
//   if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
//   return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
// }
