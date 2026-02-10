// enemy_flying.js

Game.EnemyFlying = function (x, y) {
  Game.MovingObject.call(this, x, y, 64, 80);
  Game.Animator.call(this, Game.EnemyFlying.prototype.frame_sets['ghost_apear'], 7);
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.speed = 2;
  this.direction_x = -1;
  this.ghost_health = 5;
  this.attack = false;
};
Game.EnemyFlying.prototype = {
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
    const enemyHitbox = this.getHitbox();
    const playerHurtbox = player.getHurtbox();
    return (
      enemyHitbox.left < playerHurtbox.right &&
      enemyHitbox.right > playerHurtbox.left &&
      enemyHitbox.top < playerHurtbox.bottom &&
      enemyHitbox.bottom > playerHurtbox.top
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
Object.assign(Game.EnemyFlying.prototype, Game.MovingObject.prototype);
Object.assign(Game.EnemyFlying.prototype, Game.Animator.prototype);
Game.EnemyFlying.prototype.constructor = Game.EnemyFlying;
