// collision_map.js

Object.assign(Display.prototype, {
  drawCollisionMap: function (collision_map, map_columns, tile_size) {
    this.buffer.strokeStyle = 'red';
    this.buffer.lineWidth = 2;

    for (let index = collision_map.length - 1; index > -1; --index) {
      const value = collision_map[index];
      if (value) {
        const destination_x = (index % map_columns) * tile_size;
        const destination_y = Math.floor(index / map_columns) * tile_size;
        this.buffer.strokeRect(destination_x, destination_y, tile_size, tile_size);
      }
    }
  },
});
