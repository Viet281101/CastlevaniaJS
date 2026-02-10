// game.js

const Game = function () {
  this.world = new Game.World();

  this.update = function () {
    this.world.update();
  };
};
Game.prototype = { constructor: Game };
