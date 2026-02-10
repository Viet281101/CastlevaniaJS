// update_items.js

Object.assign(Game.World.prototype, {
  updateItems: function () {
    for (let index = this.heal_health.length - 1; index > -1; --index) {
      const heal_health = this.heal_health[index];
      heal_health.updatePosition();
      heal_health.animate();
      if (heal_health.collideObject(this.player)) {
        this.heal_health.splice(this.heal_health.indexOf(heal_health), 1);
        this.health += 1;
      }
    }

    for (let index = this.torch.length - 1; index > -1; --index) {
      const torch = this.torch[index];
      torch.animate();
    }
  },
});
