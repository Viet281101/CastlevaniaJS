// setup.js

Object.assign(Game.World.prototype, {
  setup: function (zone) {
    this.collision_map = zone.collision_map;
    this.graphical_map = zone.graphical_map;
    this.columns = zone.columns;
    this.rows = zone.rows;
    this.zone_id = zone.id;

    this.spawnItems(zone);
    this.spawnEnemies(zone);
    this.spawnDoors(zone);

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
