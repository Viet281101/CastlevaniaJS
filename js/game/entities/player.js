// player.js

Game.Player = function (x, y) {
  Game.MovingObject.call(this, x, y, 92, 76);
  Game.Animator.call(this, Game.Player.prototype.frame_sets['idle-right'], 6);
  this.jumping = true;
  this.squatting = false;
  this.direction_x = -1;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.attacking = false;
  this.cooldown = 30;
};
Game.Player.prototype = {
  constructor: Game.Player,
  frame_sets: {
    'idle-left': [0, 1, 2, 3, 4],
    'idle-right': [5, 6, 7, 8, 9],
    'jump-left': [10, 11, 12, 13, 14, 15, 16],
    'jump-right': [17, 18, 19, 20, 21, 22, 23],
    'move-left': [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    'move-right': [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
    'sit-left': [52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
    'sit-right': [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    'attack-left': [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98],
    'attack-right': [
      99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
    ],
  },
  jump: function () {
    if (!this.jumping && !this.double_jump && this.velocity_y < 10) {
      this.jumping = true;
      this.velocity_y -= 25;
      this.velocity_x *= 1.8;
    }
  },
  getHitbox: function () {
    return {
      left: this.getLeft(),
      right: this.getRight(),
      top: this.getTop(),
      bottom: this.getBottom(),
    };
  },
  getHurtbox: function () {
    const hitbox = this.getHitbox();
    return {
      left: hitbox.left + 40,
      right: hitbox.right - 40,
      top: hitbox.top,
      bottom: hitbox.bottom,
    };
  },
  moveLeft: function () {
    this.direction_x = -1;
    this.velocity_x -= 0.55;
  },
  moveRight: function () {
    this.direction_x = 1;
    this.velocity_x += 0.55;
  },
  squat: function () {
    if (!this.jumping && !this.squatting) {
      this.squatting = true;
    }
  },
  attack: function () {
    if (!this.attacking) {
      this.attacking = true;
    }
  },
  updateAnimation: function () {
    if (this.velocity_y < 0) {
      if (this.direction_x < 0) {
        this.changeFrameSet(this.frame_sets['jump-left'], 'once', 5);
        this.attacking = false;
      } else {
        this.changeFrameSet(this.frame_sets['jump-right'], 'once', 5);
        this.attacking = false;
      }
    } else if (this.direction_x < 0) {
      if (this.velocity_x < -0.1 && !this.jumping) {
        this.changeFrameSet(this.frame_sets['move-left'], 'once', 10);
        this.attacking = false;
      } else if (this.squatting) {
        this.changeFrameSet(this.frame_sets['sit-left'], 'once', 10);
        this.attacking = false;
        this.squatting = false;
      } else if (this.attacking) {
        this.changeFrameSet(this.frame_sets['attack-left'], 'loop', 5);
      } else {
        this.attacking = false;
        this.changeFrameSet(this.frame_sets['idle-left'], 'loop', 6);
      }
    } else if (this.direction_x > 0) {
      if (this.velocity_x > 0.1 && !this.jumping) {
        this.changeFrameSet(this.frame_sets['move-right'], 'once', 10);
        this.attacking = false;
      } else if (this.squatting) {
        this.changeFrameSet(this.frame_sets['sit-right'], 'once', 10);
        this.squatting = false;
        this.attacking = false;
      } else if (this.attacking) {
        this.changeFrameSet(this.frame_sets['attack-right'], 'loop', 5);
      } else {
        this.attacking = false;
        this.changeFrameSet(this.frame_sets['idle-right'], 'loop', 6);
      }
    }
    this.animate();
  },
  updatePosition: function (gravity, friction) {
    this.x_old = this.x;
    this.y_old = this.y;

    this.velocity_y += gravity;
    this.velocity_x *= friction;

    if (Math.abs(this.velocity_x) > this.velocity_max)
      this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
      this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    this.x += this.velocity_x;
    this.y += this.velocity_y;

    playerPosX = this.x;
    playerPosY = this.y;

    if (this.attacking) {
      this.cooldown--;
      if (this.cooldown <= 0) {
        this.attacking = false;
        this.cooldown = 30;
      }
    }
  },
};
Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
