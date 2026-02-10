// collider.js

Game.Collider = function () {
  this.collide = function (value, object, tile_x, tile_y, tile_size) {
    switch (value) {
      case 1:
        this.collidePlatformTop(object, tile_y);
        break;
      case 2:
        this.collidePlatformRight(object, tile_x + tile_size);
        break;
      case 3:
        if (this.collidePlatformTop(object, tile_y)) return;
        this.collidePlatformRight(object, tile_x + tile_size);
        break;
      case 4:
        this.collidePlatformBottom(object, tile_y + tile_size);
        break;
      case 5:
        if (this.collidePlatformTop(object, tile_y)) return;
        this.collidePlatformBottom(object, tile_y + tile_size);
        break;
      case 6:
        if (this.collidePlatformRight(object, tile_x + tile_size)) return;
        this.collidePlatformBottom(object, tile_y + tile_size);
        break;
      case 7:
        if (this.collidePlatformTop(object, tile_y)) return;
        if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
        this.collidePlatformRight(object, tile_x + tile_size);
        break;
      case 8:
        this.collidePlatformLeft(object, tile_x);
        break;
      case 9:
        if (this.collidePlatformTop(object, tile_y)) return;
        this.collidePlatformLeft(object, tile_x);
        break;
      case 10:
        if (this.collidePlatformLeft(object, tile_x)) return;
        this.collidePlatformRight(object, tile_x + tile_size);
        break;
      case 11:
        if (this.collidePlatformTop(object, tile_y)) return;
        if (this.collidePlatformLeft(object, tile_x)) return;
        this.collidePlatformRight(object, tile_x + tile_size);
        break;
      case 12:
        if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
        this.collidePlatformLeft(object, tile_x);
        break;
      case 13:
        if (this.collidePlatformTop(object, tile_y)) return;
        if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
        this.collidePlatformLeft(object, tile_x);
        break;
      case 14:
        if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
        if (this.collidePlatformLeft(object, tile_x)) return;
        this.collidePlatformRight(object, tile_x + tile_size);
        break;
      case 15:
        if (this.collidePlatformTop(object, tile_y)) return;
        if (this.collidePlatformBottom(object, tile_y + tile_size)) return;
        if (this.collidePlatformLeft(object, tile_x)) return;
        this.collidePlatformRight(object, tile_x + tile_size);
        break;
      case 16:
        this.collideSlopeRight(object, tile_x + tile_size, tile_y, tile_size);
        break;
      case 17:
        this.collideSlopeLeft(object, tile_x, tile_y, tile_size);
        break;
      case 18:
        if (this.collidePlatformTop(object, tile_y)) return;
        if (this.collidePlatformLeft(object, tile_x)) return;
        if (this.collidePlatformRight(object, tile_x + tile_size)) return;
        this.collidePlatformSolid(
          object,
          (tile_x + 1) * tile_size,
          tile_x * tile_size,
          tile_y * tile_size,
          (tile_y + 1) * tile_size
        );
        break;
    }
  };
};
Game.Collider.prototype = {
  constructor: Game.Collider,
  collidePlatformBottom: function (object, tile_bottom) {
    if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
      object.setTop(tile_bottom);
      object.velocity_y = 0;
      return true;
    }
    return false;
  },
  collidePlatformLeft: function (object, tile_left) {
    if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
      object.setRight(tile_left - 0.01);
      object.velocity_x = 0;
      return true;
    }
    return false;
  },
  collidePlatformRight: function (object, tile_right) {
    if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
      object.setLeft(tile_right);
      object.velocity_x = 0;
      return true;
    }
    return false;
  },
  collidePlatformTop: function (object, tile_top) {
    if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
      object.setBottom(tile_top - 0.01);
      object.velocity_y = 0;
      object.jumping = false;
      return true;
    }
    return false;
  },
  collideSlopeLeft: function (object, tile_x, tile_y, tile_size) {
    const base_y = tile_y + tile_size;
    const slope = (object.x - tile_x) / tile_size;
    const top_y = base_y - slope * tile_size;
    if (object.getBottom() > top_y) {
      object.setBottom(top_y - 0.01);
      object.velocity_y = 0;
      object.jumping = false;
      return true;
    }
    return false;
  },
  collideSlopeRight: function (object, tile_x, tile_y, tile_size) {
    const slope = (tile_x + tile_size - object.getRight()) / tile_size;
    const top_y = tile_y + slope * tile_size;
    if (object.getBottom() > top_y) {
      object.setBottom(top_y - 0.01);
      object.velocity_y = 0;
      object.jumping = false;
      return true;
    }
    return false;
  },
  collidePlatformSolid: function (object, tile_right, tile_left, tile_top, tile_bottom) {
    if (this.collidePlatformLeft(object, tile_left, tile_right)) return;
    if (this.collidePlatformRight(object, tile_right, tile_left)) return;
    if (this.collidePlatformTop(object, tile_top, tile_bottom)) return;
    if (this.collidePlatformBottom(object, tile_bottom, tile_top)) return;
  },
};
