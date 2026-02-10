// ennemie.js

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
