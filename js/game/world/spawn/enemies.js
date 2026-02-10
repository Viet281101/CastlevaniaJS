// enemies.js

Object.assign(Game.World.prototype, {
  spawnEnemies: function (zone) {
    this.monster_normale = new Array();
    this.monster_jumper = new Array();
    this.monster_contactjump = new Array();
    this.monster_fly = new Array();

    for (let index = zone.monster_normale.length - 1; index > -1; --index) {
      const monster_normale = zone.monster_normale[index];
      this.monster_normale[index] = new Game.Enemy(
        monster_normale[0] * this.tile_set.tile_size,
        monster_normale[1] * this.tile_set.tile_size
      );
    }

    for (let index = zone.monster_fly.length - 1; index > -1; --index) {
      const monster_fly = zone.monster_fly[index];
      this.monster_fly[index] = new Game.EnemyFlying(
        monster_fly[0] * this.tile_set.tile_size,
        monster_fly[1] * this.tile_set.tile_size
      );
    }

    for (let index = zone.monster_jumper.length - 1; index > -1; --index) {
      const monster_jumper = zone.monster_jumper[index];
      this.monster_jumper[index] = new Game.EnemyJumper(
        monster_jumper[0] * this.tile_set.tile_size,
        monster_jumper[1] * this.tile_set.tile_size
      );
    }

    for (let index = zone.monster_contactjump.length - 1; index > -1; --index) {
      const monster_contactjump = zone.monster_contactjump[index];
      this.monster_contactjump[index] = new Game.EnemyJumpContact(
        monster_contactjump[0] * this.tile_set.tile_size,
        monster_contactjump[1] * this.tile_set.tile_size
      );
    }
  },
});
