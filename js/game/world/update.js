// update.js

Object.assign(Game.World.prototype, {
  update: function () {
    this.updatePlayer();
    this.updateItems();
    this.updateDoors();
    this.updateEnemies();
    this.updateStatus();
  },
});
