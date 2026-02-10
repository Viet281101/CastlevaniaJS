// collision.js

Object.assign(Game.World.prototype, {
  collideObject: function (object) {
    let bottom, left, right, top, value;

    top = Math.floor(object.getTop() / this.tile_set.tile_size);
    left = Math.floor(object.getLeft() / this.tile_set.tile_size);
    value = this.collision_map[top * this.columns + left];
    this.collider.collide(
      value,
      object,
      left * this.tile_set.tile_size,
      top * this.tile_set.tile_size,
      this.tile_set.tile_size
    );

    top = Math.floor(object.getTop() / this.tile_set.tile_size);
    right = Math.floor(object.getRight() / this.tile_set.tile_size);
    value = this.collision_map[top * this.columns + right];
    this.collider.collide(
      value,
      object,
      right * this.tile_set.tile_size,
      top * this.tile_set.tile_size,
      this.tile_set.tile_size
    );

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    left = Math.floor(object.getLeft() / this.tile_set.tile_size);
    value = this.collision_map[bottom * this.columns + left];
    this.collider.collide(
      value,
      object,
      left * this.tile_set.tile_size,
      bottom * this.tile_set.tile_size,
      this.tile_set.tile_size
    );

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    right = Math.floor(object.getRight() / this.tile_set.tile_size);
    value = this.collision_map[bottom * this.columns + right];
    this.collider.collide(
      value,
      object,
      right * this.tile_set.tile_size,
      bottom * this.tile_set.tile_size,
      this.tile_set.tile_size
    );
  },
});
