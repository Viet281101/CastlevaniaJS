// setup.js

Object.assign(Game.World.prototype, {
  setup: function (zone) {
    this.heal_health = new Array();
    this.monster_normale = new Array();
    this.monster_jumper = new Array();
    this.monster_contactjump = new Array();
    this.monster_fly = new Array();
    this.torch = new Array();
    this.doors = new Array();
    this.collision_map = zone.collision_map;
    this.graphical_map = zone.graphical_map;
    this.columns = zone.columns;
    this.rows = zone.rows;
    this.zone_id = zone.id;
    /* Generate items heal_health */
    for (let index = zone.heal_health.length - 1; index > -1; --index) {
      const heal_health = zone.heal_health[index];
      this.heal_health[index] = new Game.HealHealth(
        heal_health[0] * this.tile_set.tile_size + 5,
        heal_health[1] * this.tile_set.tile_size - 2
      );
    }
    /* Generate new torchs. */
    for (let index = zone.torch.length - 1; index > -1; --index) {
      const torch = zone.torch[index];
      this.torch[index] = new Game.Torch(
        torch[0] * this.tile_set.tile_size,
        torch[1] * this.tile_set.tile_size + 12
      );
    }
    /* Generate new normal monster. */
    for (let index = zone.monster_normale.length - 1; index > -1; --index) {
      const monster_normale = zone.monster_normale[index];
      this.monster_normale[index] = new Game.Ennemie(
        monster_normale[0] * this.tile_set.tile_size,
        monster_normale[1] * this.tile_set.tile_size
      );
    }
    /* Generate new flying monster. */
    for (let index = zone.monster_fly.length - 1; index > -1; --index) {
      const monster_fly = zone.monster_fly[index];
      this.monster_fly[index] = new Game.EnnemieVolant(
        monster_fly[0] * this.tile_set.tile_size,
        monster_fly[1] * this.tile_set.tile_size
      );
    }
    /* Generate new jumping monster. */
    for (let index = zone.monster_jumper.length - 1; index > -1; --index) {
      const monster_jumper = zone.monster_jumper[index];
      this.monster_jumper[index] = new Game.EnnemieSauteur(
        monster_jumper[0] * this.tile_set.tile_size,
        monster_jumper[1] * this.tile_set.tile_size
      );
    }
    /* Generate new jumping contact monster. */
    for (let index = zone.monster_contactjump.length - 1; index > -1; --index) {
      const monster_contactjump = zone.monster_contactjump[index];
      this.monster_contactjump[index] = new Game.EnnemieJumpContact(
        monster_contactjump[0] * this.tile_set.tile_size,
        monster_contactjump[1] * this.tile_set.tile_size
      );
    }
    /* Generate new doors. */
    for (let index = zone.doors.length - 1; index > -1; --index) {
      const door = zone.doors[index];
      this.doors[index] = new Game.Door(door);
    }
    if (this.door) {
      if (this.door.destination_x != -1) {
        this.player.setCenterX(this.door.destination_x);
        this.player.setOldCenterX(this.door.destination_x);
      }
      if (this.door.destination_y != -1) {
        this.player.setCenterY(this.door.destination_y);
        this.player.setOldCenterY(this.door.destination_y);
      }
      this.door = undefined;
    }
  },
});
