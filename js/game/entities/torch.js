// torch.js

Game.Torch = function (x, y) {
  Game.Animator.call(this, Game.Torch.prototype.frame_sets['torch'], 8);
  this.x = x;
  this.y = y;
};
Game.Torch.prototype = {
  frame_sets: { torch: [120, 121, 122, 123, 124, 125] },
};
Object.assign(Game.Torch.prototype, Game.Animator.prototype);
