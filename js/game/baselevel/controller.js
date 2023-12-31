

//// /* The keyDownUp handler was moved to the main file. */ ////

const Controller = function() {

	this.left  = new Controller.ButtonInput();
	this.right = new Controller.ButtonInput();
	this.up    = new Controller.ButtonInput();

	this.keyDownUp = function(type, key_code) {

		var down = (type == "keydown") ? true : false;

		switch(key_code) {
			case userKeys.LEFT:  this.left.getInput(down);  break;
			case userKeys.UP:    this.up.getInput(down);    break;
			case userKeys.RIGHT: this.right.getInput(down);
		}

	};

};

Controller.prototype = {
	constructor : Controller
};

Controller.ButtonInput = function() {
	this.active = this.down = false;
};

Controller.ButtonInput.prototype = {

	constructor : Controller.ButtonInput,

	getInput : function(down) {
		if (this.down != down) this.active = down;
		this.down = down;
	}
};
