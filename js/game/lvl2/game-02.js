
////* ----------- Game ------------- *////
const Game = function() {
	this.world    = new Game.World();

	this.update   = function() {
		this.world.update();
	};
};
Game.prototype = { constructor : Game };

////* ---------- Game Animations -------------- *////
Game.Animator = function(frame_set, delay, mode = "loop") {
	this.count       = 0;
	this.delay       = (delay >= 1) ? delay : 1;
	this.frame_set   = frame_set;
	this.frame_index = 0;
	this.frame_value = frame_set[0];
	this.mode        = mode;
};
Game.Animator.prototype = {
	constructor:Game.Animator,
	animate:function() {
		switch(this.mode) {
			case "loop" : this.loop(); break;
			case "once" : this.play(); break;
			case "pause":              break;
		}
	},
	changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) {
		if (this.frame_set === frame_set) { return; }
		this.count       = 0;
		this.delay       = delay;
		this.frame_set   = frame_set;
		this.frame_index = frame_index;
		this.frame_value = frame_set[frame_index];
		this.mode        = mode;
	},
	loop:function() {
		this.count ++;
		while(this.count > this.delay) {
			this.count -= this.delay;
			this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;
			this.frame_value = this.frame_set[this.frame_index];
		}
	},
	//// play animation once ////
	play:function() {
		this.count ++;
		while(this.count > this.delay) {
			this.count -= this.delay;
			if (this.frame_index < this.frame_set.length - 1) {
				this.frame_index ++;
			} else {
				this.mode = "pause";
			}
			this.frame_value = this.frame_set[this.frame_index];
		}
	},
};
  
////* ----------- Game Collisions ------------- *////
Game.Collider = function() {
	this.collide = function(value, object, tile_x, tile_y, tile_size) {
		switch(value) {
			case  1:     this.collidePlatformTop    (object, tile_y            ); break;
			case  2:     this.collidePlatformRight  (object, tile_x + tile_size); break;
			case  3: if (this.collidePlatformTop    (object, tile_y            )) return;
						this.collidePlatformRight  (object, tile_x + tile_size); break;
			case  4:     this.collidePlatformBottom (object, tile_y + tile_size); break;
			case  5: if (this.collidePlatformTop    (object, tile_y            )) return;
						this.collidePlatformBottom (object, tile_y + tile_size); break;
			case  6: if (this.collidePlatformRight  (object, tile_x + tile_size)) return;
						this.collidePlatformBottom (object, tile_y + tile_size); break;
			case  7: if (this.collidePlatformTop    (object, tile_y            )) return;
					if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
						this.collidePlatformRight  (object, tile_x + tile_size); break;
			case  8:     this.collidePlatformLeft   (object, tile_x            ); break;
			case  9: if (this.collidePlatformTop    (object, tile_y            )) return;
						this.collidePlatformLeft   (object, tile_x            ); break;
			case 10: if (this.collidePlatformLeft   (object, tile_x            )) return;
						this.collidePlatformRight  (object, tile_x + tile_size); break;
			case 11: if (this.collidePlatformTop    (object, tile_y            )) return;
					if (this.collidePlatformLeft   (object, tile_x            )) return;
						this.collidePlatformRight  (object, tile_x + tile_size); break;
			case 12: if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
						this.collidePlatformLeft   (object, tile_x            ); break;
			case 13: if (this.collidePlatformTop    (object, tile_y            )) return;
					if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
						this.collidePlatformLeft   (object, tile_x            ); break;
			case 14: if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
					if (this.collidePlatformLeft   (object, tile_x            )) return;
						this.collidePlatformRight  (object, tile_x + tile_size); break;
			case 15: if (this.collidePlatformTop    (object, tile_y            )) return;
					if (this.collidePlatformBottom (object, tile_y + tile_size)) return;
					if (this.collidePlatformLeft   (object, tile_x            )) return;
						this.collidePlatformRight  (object, tile_x + tile_size); break;
			case 16:    this.collideSlopeRight  (object, tile_x + tile_size, tile_y, tile_size); break;
			case 17:    this.collideSlopeLeft   (object, tile_x, tile_y, tile_size); break;
			case 18: if (this.collidePlatformTop  (object, tile_y            )) return;
					if (this.collidePlatformLeft (object, tile_x            )) return;
					if (this.collidePlatformRight(object, tile_x + tile_size)) return;
					this.collidePlatformSolid(object, (tile_x + 1) * tile_size, tile_x * tile_size, 
					tile_y * tile_size, (tile_y + 1) * tile_size); break;
		}
	}
};
Game.Collider.prototype = {
	constructor: Game.Collider,
	collidePlatformBottom:function(object, tile_bottom) {
		if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {
			object.setTop(tile_bottom);
			object.velocity_y = 0;
			return true;
		} return false;
	},
	collidePlatformLeft:function(object, tile_left) {
		if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {
			object.setRight(tile_left - 0.01);
			object.velocity_x = 0;
			return true;
		} return false;
	},
	collidePlatformRight:function(object, tile_right) {
		if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {
			object.setLeft(tile_right);
			object.velocity_x = 0;
			return true;
		} return false;
	},
	collidePlatformTop:function(object, tile_top) {
		if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {
			object.setBottom(tile_top - 0.01);
			object.velocity_y = 0;
			object.jumping    = false;
			return true;
		} return false;
	},
	collideSlopeLeft: function(object, tile_x, tile_y, tile_size) {
		let base_y = tile_y + tile_size;
		let slope = (object.x - tile_x) / tile_size;
		let top_y = base_y - slope * tile_size;
		if (object.getBottom() > top_y) {
			object.setBottom(top_y - 0.01);
			object.velocity_y = 0;
			object.jumping = false;
			return true;
		}
		return false;
	},
	collideSlopeRight: function(object, tile_x, tile_y, tile_size) {
		let slope = (tile_x + tile_size - object.getRight()) / tile_size;
		let top_y = tile_y + slope * tile_size;		
		if (object.getBottom() > top_y) {
			object.setBottom(top_y - 0.01);
			object.velocity_y = 0;
			object.jumping = false;
			return true;
		}
		return false;
	},
	collidePlatformSolid: function(object, tile_right, tile_left, tile_top, tile_bottom) {
		if (this.collidePlatformLeft(object, tile_left, tile_right)) return;
		if (this.collidePlatformRight(object, tile_right, tile_left)) return;
		if (this.collidePlatformTop(object, tile_top, tile_bottom)) return;
		if (this.collidePlatformBottom(object, tile_bottom, tile_top)) return;
	},
};

Game.Frame = function(x, y, width, height, offset_x = 0, offset_y = 0) {
	this.x        = x;
	this.y        = y;
	this.width    = width;
	this.height   = height;
	this.offset_x = offset_x;
	this.offset_y = offset_y;
};
Game.Frame.prototype = { constructor: Game.Frame };

Game.Object = function(x, y, width, height) {
	this.height = height;
	this.width  = width;
	this.x      = x;
	this.y      = y;
};
Game.Object.prototype = {
	constructor:Game.Object,

	collideObject:function(object) {
		if (this.getRight()  < object.getLeft()  ||
			this.getBottom() < object.getTop()   ||
			this.getLeft()   > object.getRight() ||
			this.getTop()    > object.getBottom()) return false;
		return true;
	},

	collideObjectCenter:function(object) {
		let center_x = object.getCenterX();
		let center_y = object.getCenterY();
		if (center_x < this.getLeft() || center_x > this.getRight() ||
			center_y < this.getTop()  || center_y > this.getBottom()) return false;
		return true;
	},

	getBottom : function()  { return this.y + this.height;       },
	getCenterX: function()  { return this.x + this.width  * 0.5; },
	getCenterY: function()  { return this.y + this.height * 0.5; },
	getLeft   : function()  { return this.x;                     },
	getRight  : function()  { return this.x + this.width;        },
	getTop    : function()  { return this.y;                     },
	setBottom : function(y) { this.y = y - this.height;          },
	setCenterX: function(x) { this.x = x - this.width  * 0.5;    },
	setCenterY: function(y) { this.y = y - this.height * 0.5;    },
	setLeft   : function(x) { this.x = x;                        },
	setRight  : function(x) { this.x = x - this.width;           },
	setTop    : function(y) { this.y = y;                        },
};

Game.MovingObject = function(x, y, width, height, velocity_max = 15) {
	Game.Object.call(this, x, y, width, height);
	this.jumping      = false;
	this.velocity_max = velocity_max;
	this.velocity_y   = 0;
	this.x_old        = x;
	this.y_old        = y;
};
Game.MovingObject.prototype = {
	getOldBottom : function()  { return this.y_old + this.height;       },
	getOldCenterX: function()  { return this.x_old + this.width  * 0.5; },
	getOldCenterY: function()  { return this.y_old + this.height * 0.5; },
	getOldLeft   : function()  { return this.x_old;                     },
	getOldRight  : function()  { return this.x_old + this.width;        },
	getOldTop    : function()  { return this.y_old;                     },
	setOldBottom : function(y) { this.y_old = y    - this.height;       },
	setOldCenterX: function(x) { this.x_old = x    - this.width  * 0.5; },
	setOldCenterY: function(y) { this.y_old = y    - this.height * 0.5; },
	setOldLeft   : function(x) { this.x_old = x;                        },
	setOldRight  : function(x) { this.x_old = x    - this.width;        },
	setOldTop    : function(y) { this.y_old = y;                        }
};
Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;


////* ----------- Game Item Heal Health ------------- *////
Game.HealHealth = function(x, y) {
	Game.Object.call(this, x, y, 18, 18);
	Game.Animator.call(this, Game.HealHealth.prototype.frame_sets["twirl"], 15);
	this.frame_index = Math.floor(Math.random() * 2);
	this.base_x     = x;
	this.base_y     = y;
	this.position_x = Math.random() * Math.PI * 2;
	this.position_y = this.position_x * 2;
};
Game.HealHealth.prototype = {
	frame_sets: { "twirl": [118, 119] },
	updatePosition:function() {
		this.position_x += 0.1;
		this.position_y += 0.2;

		this.x = this.base_x + Math.cos(this.position_x) * 2;
		this.y = this.base_y + Math.sin(this.position_y);
	}
};
Object.assign(Game.HealHealth.prototype, Game.Object.prototype);
Object.assign(Game.HealHealth.prototype, Game.Animator.prototype);
Game.HealHealth.prototype.constructor = Game.HealHealth;


////* ---------- Game Doors ----------- *////
Game.Door = function(door) {
	Game.Object.call(this, door.x, door.y, door.width, door.height);

	this.destination_x    = door.destination_x;
	this.destination_y    = door.destination_y;
	this.destination_zone = door.destination_zone;
};
Game.Door.prototype = {};
Object.assign(Game.Door.prototype, Game.Object.prototype);
Game.Door.prototype.constructor = Game.Door;


////* ---------- Game Player ----------- *////
Game.Player = function(x, y) {
	Game.MovingObject.call(this, x, y, 92, 76);
	Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-right"], 6);

	this.jumping     = true;
	this.double_jump = false;
	this.squatting   = false;
	this.direction_x = -1;
	this.velocity_x  = 0;
	this.velocity_y  = 0;
};
Game.Player.prototype = {
	frame_sets: {
		"idle-left" : [0, 1, 2, 3, 4],
		"idle-right": [5, 6, 7, 8, 9],
		"jump-left" : [10, 11, 12, 13, 14, 15, 16],
		"jump-right": [17, 18, 19, 20, 21, 22, 23],
		"move-left" : [24, 25, 26, 27, 28, 29, 30, 31, 32, 33 ,34, 35, 36, 37],
		"move-right": [38, 39, 40, 41, 42, 43, 44, 45, 46, 47 ,48, 49, 50, 51],
		"sit-left"  : [52, 53, 54, 55, 56, 57, 58, 59, 60, 61 ,62, 63, 64, 65],
		"sit-right" : [66, 67, 68, 69, 70, 71, 72, 73, 74, 75 ,76, 77, 78, 79],
		"attack-left"  : [80, 81, 82, 83, 84, 85, 86, 87, 88, 89 ,90, 91, 92, 93, 94, 95, 96, 97, 98],
		"attack-right" : [99, 100, 101, 102, 103, 104, 105, 106, 107, 108 ,109, 110, 111, 112, 113, 114, 115, 116, 117],
	},
	jump: function() {
		if (!this.jumping && !this.double_jump && this.velocity_y < 10) {
			this.jumping = true;
			this.velocity_y -= 25;
			this.velocity_x *= 1.8;
		}
	},
	moveLeft: function() {
		this.direction_x = -1;
		this.velocity_x -= 0.55;
	},
	moveRight:function(frame_set) {
		this.direction_x = 1;
		this.velocity_x += 0.55;
	},
	squat:function() {
		if (!this.jumping && !this.squatting) {
			this.squatting = true;
		}
	},
	attack:function() {
		if (!this.attacking) {
			this.attacking = true;
		}
	},
	updateAnimation:function() {
		if (this.velocity_y < 0) {
			if (this.direction_x < 0) {
				this.changeFrameSet(this.frame_sets["jump-left"], "once", 5);
			} else {
				this.changeFrameSet(this.frame_sets["jump-right"], "once", 5);
			}
		} else if (this.direction_x < 0) {
			if (this.velocity_x < -0.1 && !this.jumping) {
				this.changeFrameSet(this.frame_sets["move-left"], "once", 10);
			} else if (this.squatting) {
				this.changeFrameSet(this.frame_sets["sit-left"], "once", 10);
				this.squatting = false;
			} else if (this.attacking) {
				this.changeFrameSet(this.frame_sets["attack-left"], "loop", 5);
				this.attacking = false;
			} else {
				this.changeFrameSet(this.frame_sets["idle-left"], "loop", 6);
			}
		} else if (this.direction_x > 0) {
			if (this.velocity_x > 0.1 && !this.jumping) {
				this.changeFrameSet(this.frame_sets["move-right"], "once", 10);
			} else if (this.squatting) {
				this.changeFrameSet(this.frame_sets["sit-right"], "once", 10);
				this.squatting = false;
			} else if (this.attacking) {
				this.changeFrameSet(this.frame_sets["attack-right"], "loop", 5);
				this.attacking = false;
			} else {
				this.changeFrameSet(this.frame_sets["idle-right"], "loop", 6);
			}
		}
		this.animate();
	},
	updatePosition:function(gravity, friction) {
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
	}
};
Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;



////* ---------- Game Enemies ----------- *////
Game.Enemy = function(x, y) {
	Game.MovingObject.call(this, x, y, 92, 76);
	Game.Animator.call(this, Game.Enemy.prototype.frame_sets["idle-right"], 6);
	this.direction_x = -1;
	this.velocity_x  = 0;
	this.velocity_y  = 0;
};
Game.Enemy.prototype = {
	frame_sets: {},
	updateAnimation:function() {},
	updatePosition:function(gravity, friction) {}
};



////* ----------- Game Frames Images & Tiles ------------ *////
Game.TileSet = function(columns, tile_size) {
	this.columns    = columns;
	this.tile_size  = tile_size;

	let f = Game.Frame;
	this.frames = [
		//// Idle Left ////
		new f(11776, 76, 92, 76, -8, 0), // 0
		new f(11868, 76, 92, 76, -8, 0), // 1
		new f(11960, 76, 92, 76, -8, 0), // 2 
		new f(12052, 76, 92, 76, -8, 0), // 3
		new f(12144, 76, 92, 76, -8, 0), // 4

		//// Idle Right ////
		new f(11776,  0, 92, 76, 8, 0), // 5
		new f(11868,  0, 92, 76, 8, 0), // 6
		new f(11960,  0, 92, 76, 8, 0), // 7
		new f(12052,  0, 92, 76, 8, 0), // 8
		new f(12144,  0, 92, 76, 8, 0), // 9

		//// Jump Left ////
		new f( 8188,  76, 92, 76, -8, 0), // 10
		new f( 8280,  76, 92, 76, -8, 0), // 11
		new f( 8372,  76, 92, 76, -8, 0), // 12
		new f( 8464,  76, 92, 76, -8, 0), // 13
		new f( 8556,  76, 92, 76, -8, 0), // 14
		new f( 8648,  76, 92, 76, -8, 0), // 15
		new f( 8740,  76, 92, 76, -8, 0), // 16

		//// Jump Right ////
		new f( 8188,  0, 92, 76, 8, 0), // 17
		new f( 8280,  0, 92, 76, 8, 0), // 18
		new f( 8372,  0, 92, 76, 8, 0), // 19
		new f( 8464,  0, 92, 76, 8, 0), // 20
		new f( 8556,  0, 92, 76, 8, 0), // 21
		new f( 8648,  0, 92, 76, 8, 0), // 22
		new f( 8740,  0, 92, 76, 8, 0), // 23

		//// Move Left ////
		new f( 3312,  76, 92, 76, -8, 0), // 24
		new f( 3404,  76, 92, 76, -8, 0), // 25
		new f( 3496,  76, 92, 76, -8, 0), // 26
		new f( 3588,  76, 92, 76, -8, 0), // 27
		new f( 3680,  76, 92, 76, -8, 0), // 28
		new f( 3772,  76, 92, 76, -8, 0), // 29
		new f( 3864,  76, 92, 76, -8, 0), // 30
		new f( 3956,  76, 92, 76, -8, 0), // 31
		new f( 4048,  76, 92, 76, -8, 0), // 32
		new f( 4140,  76, 92, 76, -8, 0), // 33
		new f( 4232,  76, 92, 76, -8, 0), // 34
		new f( 4324,  76, 92, 76, -8, 0), // 35
		new f( 4416,  76, 92, 76, -8, 0), // 36
		new f( 4508,  76, 92, 76, -8, 0), // 37

		//// Move Right ////
		new f( 3312,   0, 92, 76, 8, 0), // 38
		new f( 3404,   0, 92, 76, 8, 0), // 39
		new f( 3496,   0, 92, 76, 8, 0), // 40
		new f( 3588,   0, 92, 76, 8, 0), // 41
		new f( 3680,   0, 92, 76, 8, 0), // 42
		new f( 3772,   0, 92, 76, 8, 0), // 43
		new f( 3864,   0, 92, 76, 8, 0), // 44
		new f( 3956,   0, 92, 76, 8, 0), // 45
		new f( 4048,   0, 92, 76, 8, 0), // 46
		new f( 4140,   0, 92, 76, 8, 0), // 47
		new f( 4232,   0, 92, 76, 8, 0), // 48
		new f( 4324,   0, 92, 76, 8, 0), // 49
		new f( 4416,   0, 92, 76, 8, 0), // 50
		new f( 4508,   0, 92, 76, 8, 0), // 51

		//// Sit Down Left ////
		new f( 4692,  76, 92, 76, -8, 0), // 52
		new f( 4784,  76, 92, 76, -8, 0), // 53
		new f( 4876,  76, 92, 76, -8, 0), // 54
		new f( 4968,  76, 92, 76, -8, 0), // 55
		new f( 5060,  76, 92, 76, -8, 0), // 56
		new f( 5152,  76, 92, 76, -8, 0), // 57
		new f( 5244,  76, 92, 76, -8, 0), // 58
		new f( 5336,  76, 92, 76, -8, 0), // 59
		new f( 5428,  76, 92, 76, -8, 0), // 60
		new f( 5520,  76, 92, 76, -8, 0), // 61
		new f( 5612,  76, 92, 76, -8, 0), // 62
		new f( 5704,  76, 92, 76, -8, 0), // 63
		new f( 5796,  76, 92, 76, -8, 0), // 64
		new f( 5888,  76, 92, 76, -8, 0), // 65

		//// Sit Down Right ////
		new f( 4692,   0, 92, 76, 8, 0), // 66
		new f( 4784,   0, 92, 76, 8, 0), // 67
		new f( 4876,   0, 92, 76, 8, 0), // 68
		new f( 4968,   0, 92, 76, 8, 0), // 69
		new f( 5060,   0, 92, 76, 8, 0), // 70
		new f( 5152,   0, 92, 76, 8, 0), // 71
		new f( 5244,   0, 92, 76, 8, 0), // 72
		new f( 5336,   0, 92, 76, 8, 0), // 73
		new f( 5428,   0, 92, 76, 8, 0), // 74
		new f( 5520,   0, 92, 76, 8, 0), // 75
		new f( 5612,   0, 92, 76, 8, 0), // 76
		new f( 5704,   0, 92, 76, 8, 0), // 77
		new f( 5796,   0, 92, 76, 8, 0), // 78
		new f( 5888,   0, 92, 76, 8, 0), // 79

		//// Attack Left ////
		new f(  0,  76, 92, 76, -8, 0), // 80
		new f( 92,  76, 92, 76, -8, 0), // 81
		new f(184,  76, 92, 76, -8, 0), // 82
		new f(276,  76, 92, 76, -8, 0), // 83
		new f(368,  76, 92, 76, -8, 0), // 84
		new f(460,  76, 92, 76, -8, 0), // 85
		new f(552,  76, 92, 76, -8, 0), // 86
		new f(644,  76, 92, 76, -8, 0), // 87
		new f(736,  76, 92, 76, -8, 0), // 88
		new f(828,  76, 92, 76, -8, 0), // 89
		new f(920,  76, 92, 76, -8, 0), // 90
		new f(1012, 76, 92, 76, -8, 0), // 91
		new f(1104, 76, 92, 76, -8, 0), // 92
		new f(1196, 76, 92, 76, -8, 0), // 93
		new f(1288, 76, 92, 76, -8, 0), // 94
		new f(1380, 76, 92, 76, -8, 0), // 95
		new f(1472, 76, 92, 76, -8, 0), // 96
		new f(1564, 76, 92, 76, -8, 0), // 97
		new f(1656, 76, 92, 76, -8, 0), // 98

		//// Attack Right ////
		new f(  0,   0, 92, 76, 8, 0), // 99
		new f( 92,   0, 92, 76, 8, 0), // 100
		new f(184,   0, 92, 76, 8, 0), // 101
		new f(276,   0, 92, 76, 8, 0), // 102
		new f(368,   0, 92, 76, 8, 0), // 103
		new f(460,   0, 92, 76, 8, 0), // 104
		new f(552,   0, 92, 76, 8, 0), // 105
		new f(644,   0, 92, 76, 8, 0), // 106
		new f(736,   0, 92, 76, 8, 0), // 107
		new f(828,   0, 92, 76, 8, 0), // 108
		new f(920,   0, 92, 76, 8, 0), // 109
		new f(1012,  0, 92, 76, 8, 0), // 110
		new f(1104,  0, 92, 76, 8, 0), // 111
		new f(1196,  0, 92, 76, 8, 0), // 112
		new f(1288,  0, 92, 76, 8, 0), // 113
		new f(1380,  0, 92, 76, 8, 0), // 114
		new f(1472,  0, 92, 76, 8, 0), // 115
		new f(1564,  0, 92, 76, 8, 0), // 116
		new f(1656,  0, 92, 76, 8, 0), // 117

		//// Heal Health ////
		new f(   0,  0, 18, 18), // 118
		new f(  18,  0, 18, 18), // 119

	];
};
Game.TileSet.prototype = { constructor: Game.TileSet };


////* ----------- Game World ------------ *////
Game.World = function(friction = 0.85, gravity = 2) {
	this.collider  = new Game.Collider();

	this.friction  = friction;
	this.gravity   = gravity;

	this.columns   = 20;
	this.rows      = 9;

	this.tile_set  = new Game.TileSet(18, 32);
	this.player    = new Game.Player(playerPosX, playerPosY);

	this.zone_id   = currentZone;

	this.heal_health = [];
	this.health 	= 10;
	this.doors     = [];
	this.door      = undefined;

	this.height    = this.tile_set.tile_size * this.rows;
	this.width     = this.tile_set.tile_size * this.columns;
};
Game.World.prototype = {
	constructor: Game.World,
	collideObject:function(object) {
		var bottom, left, right, top, value;

		top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
		left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
		value  = this.collision_map[top * this.columns + left];
		this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

		top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
		right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
		value  = this.collision_map[top * this.columns + right];
		this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

		bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
		left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
		value  = this.collision_map[bottom * this.columns + left];
		this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

		bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
		right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
		value  = this.collision_map[bottom * this.columns + right];
		this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);
	},

	setup:function(zone) {
		this.heal_health 		= new Array();
		this.doors              = new Array();
		this.collision_map      = zone.collision_map;
		this.graphical_map      = zone.graphical_map;
		this.columns            = zone.columns;
		this.rows               = zone.rows;
		this.zone_id            = zone.id;

		/* Generate items heal_health */
		for (let index = zone.heal_health.length - 1; index > -1; -- index) {
			let heal_health = zone.heal_health[index];
			this.heal_health[index] = new Game.HealHealth(heal_health[0] * this.tile_set.tile_size + 5, heal_health[1] * this.tile_set.tile_size - 2);
		}

		/* Generate new doors. */
		for (let index = zone.doors.length - 1; index > -1; -- index) {
			let door = zone.doors[index];
			this.doors[index] = new Game.Door(door);
		}

		if (this.door) {
			if (this.door.destination_x != -1) {
				this.player.setCenterX   (this.door.destination_x);
				this.player.setOldCenterX(this.door.destination_x);
			}
			if (this.door.destination_y != -1) {
				this.player.setCenterY   (this.door.destination_y);
				this.player.setOldCenterY(this.door.destination_y);
			}
			this.door = undefined;
		}
	},

	update:function() {
		this.player.updatePosition(this.gravity, this.friction);
		this.collideObject(this.player);

		for (let index = this.heal_health.length - 1; index > -1; -- index) {
			let heal_health = this.heal_health[index];
			heal_health.updatePosition();
			heal_health.animate();
			if (heal_health.collideObject(this.player)) {
				this.heal_health.splice(this.heal_health.indexOf(heal_health), 1);
				this.health += 1;
			}
		}

		for(let index = this.doors.length - 1; index > -1; -- index) {
			let door = this.doors[index];
			if (door.collideObjectCenter(this.player)) {
				this.door = door;
			};
		}
		this.player.updateAnimation();
	},
};

