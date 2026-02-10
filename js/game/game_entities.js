// game_entities.js

Game.HealHealth = function (x, y) {
  Game.Object.call(this, x, y, 18, 18);
  Game.Animator.call(this, Game.HealHealth.prototype.frame_sets['twirl'], 15);
  this.frame_index = Math.floor(Math.random() * 2);
  this.base_x = x;
  this.base_y = y;
  this.position_x = Math.random() * Math.PI * 2;
  this.position_y = this.position_x * 2;
};
Game.HealHealth.prototype = {
  frame_sets: { twirl: [118, 119] },
  updatePosition: function () {
    this.position_x += 0.1;
    this.position_y += 0.2;

    this.x = this.base_x + Math.cos(this.position_x) * 2;
    this.y = this.base_y + Math.sin(this.position_y);
  },
};
Object.assign(Game.HealHealth.prototype, Game.Object.prototype);
Object.assign(Game.HealHealth.prototype, Game.Animator.prototype);
Game.HealHealth.prototype.constructor = Game.HealHealth;

Game.Torch = function (x, y) {
  Game.Animator.call(this, Game.Torch.prototype.frame_sets['torch'], 8);
  this.x = x;
  this.y = y;
};
Game.Torch.prototype = {
  frame_sets: { torch: [120, 121, 122, 123, 124, 125] },
};
Object.assign(Game.Torch.prototype, Game.Animator.prototype);

Game.Door = function (door) {
  Game.Object.call(this, door.x, door.y, door.width, door.height);

  this.destination_x = door.destination_x;
  this.destination_y = door.destination_y;
  this.destination_zone = door.destination_zone;
};
Game.Door.prototype = {};
Object.assign(Game.Door.prototype, Game.Object.prototype);
Game.Door.prototype.constructor = Game.Door;

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

Game.Ennemie = function (x, y) {
  Game.MovingObject.call(this, x, y, 72, 48);
  Game.Animator.call(this, Game.Ennemie.prototype.frame_sets['nightmare_left'], 6);
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.direction_x = -1;
};
Game.Ennemie.prototype = {
  frame_sets: {
    nightmare_right: [142, 143, 144, 145],
    nightmare_left: [146, 147, 148, 149],
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
      left: hitbox.left,
      right: hitbox.right,
      top: hitbox.top,
      bottom: hitbox.bottom,
    };
  },
  collideWithPlayer: function (player) {
    const ennemieHitbox = this.getHitbox();
    const playerHurtbox = player.getHurtbox();
    return (
      ennemieHitbox.left < playerHurtbox.right &&
      ennemieHitbox.right > playerHurtbox.left &&
      ennemieHitbox.top < playerHurtbox.bottom &&
      ennemieHitbox.bottom > playerHurtbox.top
    );
  },
  updatePosition: function (gravity, friction, player, health) {
    this.x_old = this.x;
    this.y_old = this.y;
    this.velocity_y += gravity;
    this.velocity_x *= friction;

    if (Math.abs(this.velocity_x) > this.velocity_max)
      this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
      this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    if (!this.collideWithPlayer(player)) {
      if (this.x - 15 < player.x) {
        this.velocity_x = 2;
        this.direction_x = 1;
        this.changeFrameSet(this.frame_sets['nightmare_right'], 'loop', 6);
      } else if (this.x + 15 > player.x) {
        this.velocity_x = -2;
        this.direction_x = -1;
        this.changeFrameSet(this.frame_sets['nightmare_left'], 'loop', 6);
      } else {
        this.velocity_x = 0;
      }
    } else {
      this.velocity_x = 0;
      health -= 1;
    }
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  },
};
Object.assign(Game.Ennemie.prototype, Game.MovingObject.prototype);
Object.assign(Game.Ennemie.prototype, Game.Animator.prototype);
Game.Ennemie.prototype.constructor = Game.Ennemie;

Game.EnnemieSauteur = function (x, y) {
  Game.MovingObject.call(this, x, y, 48, 56);
  Game.Animator.call(this, Game.EnnemieSauteur.prototype.frame_sets['skull_jump-left'], 9);
  this.jumping = true;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.direction_x = -1;
};
Game.EnnemieSauteur.prototype = {
  frame_sets: {
    'skull_jump-left': [126, 127, 128, 129, 130, 131, 132, 133],
    'skull_jump-right': [134, 135, 136, 137, 138, 139, 140, 141],
  },
  jump: function () {
    if (!this.jumping) {
      this.jumping = true;
      this.velocity_y -= 30;
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
      left: hitbox.left,
      right: hitbox.right,
      top: hitbox.top,
      bottom: hitbox.bottom,
    };
  },
  collideWithPlayer: function (player) {
    const ennemieHitbox = this.getHitbox();
    const playerHurtbox = player.getHurtbox();
    return (
      ennemieHitbox.left < playerHurtbox.right &&
      ennemieHitbox.right > playerHurtbox.left &&
      ennemieHitbox.top < playerHurtbox.bottom &&
      ennemieHitbox.bottom > playerHurtbox.top
    );
  },
  updatePosition: function (gravity, friction, player) {
    this.x_old = this.x;
    this.y_old = this.y;
    this.velocity_y += gravity;
    this.velocity_x *= friction;
    if (Math.abs(this.velocity_x) > this.velocity_max)
      this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);
    if (Math.abs(this.velocity_y) > this.velocity_max)
      this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);
    if (!this.collideWithPlayer(player)) {
      const originalX = this.x;
      if (this.x - 15 < player.x) {
        this.velocity_x = 2;
        this.direction_x = 1;
        this.changeFrameSet(this.frame_sets['skull_jump-right'], 'loop', 8);
      } else if (this.x + 15 > player.x) {
        this.velocity_x = -2;
        this.direction_x = -1;
        this.changeFrameSet(this.frame_sets['skull_jump-left'], 'loop', 8);
      } else {
        this.velocity_x = 0;
      }
      this.x_old = originalX;
    } else {
      this.velocity_x = 0;
    }
    if (this.x === this.x_old) {
      this.jump();
    }
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  },
};
Object.assign(Game.EnnemieSauteur.prototype, Game.MovingObject.prototype);
Object.assign(Game.EnnemieSauteur.prototype, Game.Animator.prototype);
Game.EnnemieSauteur.prototype.constructor = Game.EnnemieSauteur;

Game.EnnemieJumpContact = function (x, y) {
  Game.MovingObject.call(this, x, y, 48, 56);
  Game.Animator.call(this, Game.EnnemieJumpContact.prototype.frame_sets['skull_jump-left'], 9);
  this.jumping = true;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.direction_x = -1;
};
Game.EnnemieJumpContact.prototype = {
  frame_sets: {
    'skull_jump-left': [126, 127, 128, 129, 130, 131, 132, 133],
    'skull_jump-right': [134, 135, 136, 137, 138, 139, 140, 141],
  },
  jump: function () {
    if (!this.jumping) {
      this.jumping = true;
      this.velocity_y -= 30;
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
      left: hitbox.left,
      right: hitbox.right,
      top: hitbox.top,
      bottom: hitbox.bottom,
    };
  },
  collideWithPlayer: function (player) {
    const ennemieHitbox = this.getHitbox();
    const playerHurtbox = player.getHurtbox();
    return (
      ennemieHitbox.left < playerHurtbox.right &&
      ennemieHitbox.right > playerHurtbox.left &&
      ennemieHitbox.top < playerHurtbox.bottom &&
      ennemieHitbox.bottom > playerHurtbox.top
    );
  },
  updatePosition: function (gravity, friction, player) {
    this.x_old = this.x;
    this.y_old = this.y;
    this.velocity_y += gravity;
    this.velocity_x *= friction;
    if (Math.abs(this.velocity_x) > this.velocity_max)
      this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);
    if (Math.abs(this.velocity_y) > this.velocity_max)
      this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);
    if (!this.collideWithPlayer(player)) {
      const originalX = this.x;
      if (this.x - 15 < player.x) {
        this.velocity_x = 2;
        this.direction_x = 1;
        this.changeFrameSet(this.frame_sets['skull_jump-right'], 'loop', 8);
      } else if (this.x + 15 > player.x) {
        this.velocity_x = -2;
        this.direction_x = -1;
        this.changeFrameSet(this.frame_sets['skull_jump-left'], 'loop', 8);
      } else {
        this.velocity_x = 0;
      }
      this.x_old = originalX;
    } else {
      this.velocity_x = 0;
    }
    if (this.velocity_x > 0 && this.x_old == this.x) {
      this.jump();
    }
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  },
};
Object.assign(Game.EnnemieJumpContact.prototype, Game.MovingObject.prototype);
Object.assign(Game.EnnemieJumpContact.prototype, Game.Animator.prototype);
Game.EnnemieJumpContact.prototype.constructor = Game.EnnemieJumpContact;

Game.EnnemieVolant = function (x, y) {
  Game.MovingObject.call(this, x, y, 64, 80);
  Game.Animator.call(this, Game.EnnemieVolant.prototype.frame_sets['ghost_apear'], 7);
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.speed = 2;
  this.direction_x = -1;
  this.ghost_health = 5;
  this.attack = false;
};
Game.EnnemieVolant.prototype = {
  frame_sets: {
    ghost_apear: [150, 151, 152, 153, 154, 155],
    ghost_disapear: [156, 157, 158, 159, 160, 161, 162],
    ghost_fly_left: [163, 164, 165, 166, 167, 168, 169, 170],
    ghost_fly_right: [171, 172, 173, 174, 175, 176, 177, 178],
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
      left: hitbox.left,
      right: hitbox.right,
      top: hitbox.top,
      bottom: hitbox.bottom,
    };
  },
  collideWithPlayer: function (player) {
    const ennemieHitbox = this.getHitbox();
    const playerHurtbox = player.getHurtbox();
    return (
      ennemieHitbox.left < playerHurtbox.right &&
      ennemieHitbox.right > playerHurtbox.left &&
      ennemieHitbox.top < playerHurtbox.bottom &&
      ennemieHitbox.bottom > playerHurtbox.top
    );
  },
  updatePosition: function (gravity, friction, player) {
    this.x_old = this.x;
    this.y_old = this.y;
    this.velocity_y += gravity;
    this.velocity_x *= friction;
    if (Math.abs(this.velocity_x) > this.velocity_max)
      this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);
    if (Math.abs(this.velocity_y) > this.velocity_max)
      this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);
    if (!this.collideWithPlayer(player)) {
      if (this.x - 15 < player.x) {
        this.velocity_x = this.speed;
        this.direction_x = 1;
        this.changeFrameSet(this.frame_sets['ghost_fly_left'], 'loop', 9);
      } else if (this.x + 15 > player.x) {
        this.velocity_x = -this.speed;
        this.direction_x = -1;
        this.changeFrameSet(this.frame_sets['ghost_fly_right'], 'loop', 9);
      } else {
        this.velocity_x = 0;
      }
      if (this.y - 25 < player.y) {
        this.velocity_y = this.speed;
      } else if (this.y + 25 > player.y) {
        this.velocity_y = -this.speed;
      } else {
        this.velocity_y = 0;
      }
    } else {
      this.velocity_x = 0;
      this.velocity_y = 0;
    }
    this.x += this.velocity_x;
    this.y += this.velocity_y;
  },
};
Object.assign(Game.EnnemieVolant.prototype, Game.MovingObject.prototype);
Object.assign(Game.EnnemieVolant.prototype, Game.Animator.prototype);
Game.EnnemieVolant.prototype.constructor = Game.EnnemieVolant;
