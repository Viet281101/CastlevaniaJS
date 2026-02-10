// frame.js

Game.Frame = function (x, y, width, height, offset_x = 0, offset_y = 0) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.offset_x = offset_x;
  this.offset_y = offset_y;
};
Game.Frame.prototype = { constructor: Game.Frame };
