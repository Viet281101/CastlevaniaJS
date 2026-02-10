// update_player.js

Object.assign(Game.World.prototype, {
  updatePlayer: function () {
    this.player.updatePosition(this.gravity, this.friction);
    this.collideObject(this.player);
    this.player.updateAnimation();
  },
});
