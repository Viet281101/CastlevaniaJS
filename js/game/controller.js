const Controller = function () {
  this.left = new Controller.ButtonInput();
  this.right = new Controller.ButtonInput();
  this.up = new Controller.ButtonInput();
  this.squat = new Controller.ButtonInput();
  this.attack = new Controller.ButtonInput();
  this.pause = new Controller.ButtonInput();
  this.escape = new Controller.ButtonInput();
  this.inventory = new Controller.ButtonInput();

  this.keyDownUp = function (type, key_code) {
    var down = type == 'keydown' ? true : false;

    switch (key_code) {
      case userKeys.LEFT:
        this.left.getInput(down);
        break;
      case userKeys.UP:
        this.up.getInput(down);
        break;
      case userKeys.DOWN:
        this.squat.getInput(down);
        break;
      case userKeys.SPACE:
        this.attack.getInput(down);
        break;
      case userKeys.P:
        this.pause.getInput(down);
        break;
      case userKeys.TAB:
        this.inventory.getInput(down);
        break;
      case userKeys.ESCAPE:
        this.escape.getInput(down);
        break;
      case userKeys.RIGHT:
        this.right.getInput(down);
    }
  };
};

Controller.prototype = {
  constructor: Controller,
};

Controller.ButtonInput = function () {
  this.active = this.down = false;
};

Controller.ButtonInput.prototype = {
  constructor: Controller.ButtonInput,
  getInput: function (down) {
    if (this.down != down) this.active = down;
    this.down = down;
  },
};
