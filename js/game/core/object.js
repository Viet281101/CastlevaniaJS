// object.js

Game.Object = function (x, y, width, height) {
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;
};
Game.Object.prototype = {
  constructor: Game.Object,
  collideObject: function (object) {
    if (
      this.getRight() < object.getLeft() ||
      this.getBottom() < object.getTop() ||
      this.getLeft() > object.getRight() ||
      this.getTop() > object.getBottom()
    )
      return false;
    return true;
  },
  collideObjectCenter: function (object) {
    const center_x = object.getCenterX();
    const center_y = object.getCenterY();
    if (
      center_x < this.getLeft() ||
      center_x > this.getRight() ||
      center_y < this.getTop() ||
      center_y > this.getBottom()
    )
      return false;
    return true;
  },
  getBottom: function () {
    return this.y + this.height;
  },
  getCenterX: function () {
    return this.x + this.width * 0.5;
  },
  getCenterY: function () {
    return this.y + this.height * 0.5;
  },
  getLeft: function () {
    return this.x;
  },
  getRight: function () {
    return this.x + this.width;
  },
  getTop: function () {
    return this.y;
  },
  setBottom: function (y) {
    this.y = y - this.height;
  },
  setCenterX: function (x) {
    this.x = x - this.width * 0.5;
  },
  setCenterY: function (y) {
    this.y = y - this.height * 0.5;
  },
  setLeft: function (x) {
    this.x = x;
  },
  setRight: function (x) {
    this.x = x - this.width;
  },
  setTop: function (y) {
    this.y = y;
  },
};
