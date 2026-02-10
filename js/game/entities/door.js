// door.js

Game.Door = function (door) {
  Game.Object.call(this, door.x, door.y, door.width, door.height);

  this.destination_x = door.destination_x;
  this.destination_y = door.destination_y;
  this.destination_zone = door.destination_zone;
};
Game.Door.prototype = {};
Object.assign(Game.Door.prototype, Game.Object.prototype);
Game.Door.prototype.constructor = Game.Door;
