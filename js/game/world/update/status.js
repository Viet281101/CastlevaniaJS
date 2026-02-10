// update_status.js

Object.assign(Game.World.prototype, {
  updateStatus: function () {
    if (this.cooldown > 0) {
      this.cooldown -= 1;
    }

    if (this.health <= 0) {
      document.location.reload(true);
    }
  },
});
