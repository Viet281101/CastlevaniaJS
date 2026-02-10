// doors.js

Object.assign(Game.World.prototype, {
  spawnDoors: function (zone) {
    this.doors = new Array();

    for (let index = zone.doors.length - 1; index > -1; --index) {
      const door = zone.doors[index];
      this.doors[index] = new Game.Door(door);
    }
  },
});
