// ennemie_sauteur.js

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
