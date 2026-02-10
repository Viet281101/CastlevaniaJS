// game_core.js

const Game = function () {
  this.world = new Game.World();

  this.update = function () {
    this.world.update();
  };
};
Game.prototype = { constructor: Game };

Game.Animator = function (frame_set, delay, mode = 'loop') {
  this.count = 0;
  this.delay = delay >= 1 ? delay : 1;
  this.frame_set = frame_set;
  this.frame_index = 0;
  this.frame_value = frame_set[0];
  this.mode = mode;
};
Game.Animator.prototype = {
  constructor: Game.Animator,
  animate: function () {
    switch (this.mode) {
      case 'loop':
        this.loop();
        break;
      case 'once':
        this.play();
        break;
      case 'pause':
        break;
    }
  },
  changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) {
    if (this.frame_set === frame_set) {
      return;
    }
    this.count = 0;
    this.delay = delay;
    this.frame_set = frame_set;
    this.frame_index = frame_index;
    this.frame_value = frame_set[frame_index];
    this.mode = mode;
  },
  loop: function () {
    this.count++;
    while (this.count > this.delay) {
      this.count -= this.delay;
      this.frame_index = this.frame_index < this.frame_set.length - 1 ? this.frame_index + 1 : 0;
      this.frame_value = this.frame_set[this.frame_index];
    }
  },
  play: function () {
    this.count++;
    while (this.count > this.delay) {
      this.count -= this.delay;
      if (this.frame_index < this.frame_set.length - 1) {
        this.frame_index++;
      } else {
        this.mode = 'pause';
      }
      this.frame_value = this.frame_set[this.frame_index];
    }
  },
};

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

Game.Frame = function (x, y, width, height, offset_x = 0, offset_y = 0) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.offset_x = offset_x;
  this.offset_y = offset_y;
};
Game.Frame.prototype = { constructor: Game.Frame };

Game.Object = function (x, y, width, height) {
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;
};
Game.Object.prototype = {
  constructor: Game.Object,
  collideObject: function (object) {
    if (
      this.getRight() < object.getLeft() ||
      this.getBottom() < object.getTop() ||
      this.getLeft() > object.getRight() ||
      this.getTop() > object.getBottom()
    )
      return false;
    return true;
  },
  collideObjectCenter: function (object) {
    const center_x = object.getCenterX();
    const center_y = object.getCenterY();
    if (
      center_x < this.getLeft() ||
      center_x > this.getRight() ||
      center_y < this.getTop() ||
      center_y > this.getBottom()
    )
      return false;
    return true;
  },
  getBottom: function () {
    return this.y + this.height;
  },
  getCenterX: function () {
    return this.x + this.width * 0.5;
  },
  getCenterY: function () {
    return this.y + this.height * 0.5;
  },
  getLeft: function () {
    return this.x;
  },
  getRight: function () {
    return this.x + this.width;
  },
  getTop: function () {
    return this.y;
  },
  setBottom: function (y) {
    this.y = y - this.height;
  },
  setCenterX: function (x) {
    this.x = x - this.width * 0.5;
  },
  setCenterY: function (y) {
    this.y = y - this.height * 0.5;
  },
  setLeft: function (x) {
    this.x = x;
  },
  setRight: function (x) {
    this.x = x - this.width;
  },
  setTop: function (y) {
    this.y = y;
  },
};

Game.MovingObject = function (x, y, width, height, velocity_max = 15) {
  Game.Object.call(this, x, y, width, height);
  this.jumping = false;
  this.velocity_max = velocity_max;
  this.velocity_y = 0;
  this.x_old = x;
  this.y_old = y;
};
Game.MovingObject.prototype = {
  getOldBottom: function () {
    return this.y_old + this.height;
  },
  getOldCenterX: function () {
    return this.x_old + this.width * 0.5;
  },
  getOldCenterY: function () {
    return this.y_old + this.height * 0.5;
  },
  getOldLeft: function () {
    return this.x_old;
  },
  getOldRight: function () {
    return this.x_old + this.width;
  },
  getOldTop: function () {
    return this.y_old;
  },
  setOldBottom: function (y) {
    this.y_old = y - this.height;
  },
  setOldCenterX: function (x) {
    this.x_old = x - this.width * 0.5;
  },
  setOldCenterY: function (y) {
    this.y_old = y - this.height * 0.5;
  },
  setOldLeft: function (x) {
    this.x_old = x;
  },
  setOldRight: function (x) {
    this.x_old = x - this.width;
  },
  setOldTop: function (y) {
    this.y_old = y;
  },
};
Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;
