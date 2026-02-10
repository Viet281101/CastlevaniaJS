// heal_health.js

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
