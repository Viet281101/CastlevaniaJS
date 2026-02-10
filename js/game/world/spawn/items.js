// items.js

Object.assign(Game.World.prototype, {
  spawnItems: function (zone) {
    this.heal_health = new Array();
    this.torch = new Array();

    for (let index = zone.heal_health.length - 1; index > -1; --index) {
      const heal_health = zone.heal_health[index];
      this.heal_health[index] = new Game.HealHealth(
        heal_health[0] * this.tile_set.tile_size + 5,
        heal_health[1] * this.tile_set.tile_size - 2
      );
    }

    for (let index = zone.torch.length - 1; index > -1; --index) {
      const torch = zone.torch[index];
      this.torch[index] = new Game.Torch(
        torch[0] * this.tile_set.tile_size,
        torch[1] * this.tile_set.tile_size + 12
      );
    }
  },
});
