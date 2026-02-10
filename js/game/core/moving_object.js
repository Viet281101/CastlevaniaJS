// moving_object.js

Game.MovingObject = function (x, y, width, height, velocity_max = 15) {
  Game.Object.call(this, x, y, width, height);
  this.jumping = false;
  this.velocity_max = velocity_max;
  this.velocity_y = 0;
  this.x_old = x;
  this.y_old = y;
};
Game.MovingObject.prototype = {
  getOldBottom: function () {
    return this.y_old + this.height;
  },
  getOldCenterX: function () {
    return this.x_old + this.width * 0.5;
  },
  getOldCenterY: function () {
    return this.y_old + this.height * 0.5;
  },
  getOldLeft: function () {
    return this.x_old;
  },
  getOldRight: function () {
    return this.x_old + this.width;
  },
  getOldTop: function () {
    return this.y_old;
  },
  setOldBottom: function (y) {
    this.y_old = y - this.height;
  },
  setOldCenterX: function (x) {
    this.x_old = x - this.width * 0.5;
  },
  setOldCenterY: function (y) {
    this.y_old = y - this.height * 0.5;
  },
  setOldLeft: function (x) {
    this.x_old = x;
  },
  setOldRight: function (x) {
    this.x_old = x - this.width;
  },
  setOldTop: function (y) {
    this.y_old = y;
  },
};
Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;
