// update_doors.js

Object.assign(Game.World.prototype, {
  updateDoors: function () {
    for (let index = this.doors.length - 1; index > -1; --index) {
      const door = this.doors[index];
      if (door.collideObjectCenter(this.player)) {
        this.door = door;
      }
    }
  },
});
