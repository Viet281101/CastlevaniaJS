// enemy.js

Object.assign(Display.prototype, {
  drawEnemy: function (rectangle, color1, color2) {
    this.buffer.fillStyle = color1;
    this.buffer.fillRect(
      Math.round(rectangle.x),
      Math.round(rectangle.y),
      rectangle.width,
      rectangle.height
    );
    this.buffer.fillStyle = color2;
    this.buffer.fillRect(
      Math.round(rectangle.x + 2),
      Math.round(rectangle.y + 2),
      rectangle.width - 4,
      rectangle.height - 4
    );
  },
});
