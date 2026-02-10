// map.js

Object.assign(Display.prototype, {
  drawMap: function (image, image_columns, map, map_columns, tile_size) {
    for (let index = map.length - 1; index > -1; --index) {
      const value = map[index];
      const source_x = (value % image_columns) * tile_size;
      const source_y = Math.floor(value / image_columns) * tile_size;
      const destination_x = (index % map_columns) * tile_size;
      const destination_y = Math.floor(index / map_columns) * tile_size;

      this.buffer.drawImage(
        image,
        source_x,
        source_y,
        tile_size,
        tile_size,
        destination_x,
        destination_y,
        tile_size,
        tile_size
      );
    }
  },
});
