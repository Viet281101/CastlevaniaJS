// display.js

const Display = function (canvas) {
  this.buffer = document.createElement('canvas').getContext('2d');
  this.context = canvas.getContext('2d');
};

Display.prototype = {
  constructor: Display,
};
