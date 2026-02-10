// animator.js

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
