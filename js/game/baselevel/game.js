
const Game = function() {

	this.world = new Game.World();
	this.paused = false;

	this.update = function() {
		if (!this.paused) {
			this.world.update();
		}
	};
};
  
Game.prototype = { constructor : Game,
	               togglePause: function (){
				   		this.paused	= !this.paused;
					},
					pause: function (){
						this.paused = true;
					},
					resume: function (){
						this.paused = false;
					}
};
  
Game.World = function(friction = 0.9, gravity = 3) {

	this.collider = new Game.World.Collider();

	this.friction = friction;
	this.gravity  = gravity;

	this.player   = new Game.World.Player();

	this.columns   = 20;
	this.rows      = 9;
	this.tile_size = 32;

	this.map = [73,74,73,74,73,74,73,74,73,73,73,74,73,73,74,74,73,74,73,74,
				73,74,73,74,73,74,73,74,73,73,73,74,73,73,74,74,73,74,73,74,
				73,74,73,74,73,74,73,74,73,73,73,74,73,73,74,74,73,74,73,74,
				73,74,73,74,73,74,73,74,73,73,73,74,73,73,74,74,73,74,73,74,
				73,74,73,74,73,74,73,74,73,73,73,74,73,73,74,74,73,74,73,74,
				73,74,73,74,73,74,73,74,73,73,73,74,73,73,74,74,73,74,73,74,
				73,74,73,74,73,74,73,74,73,73,73,74,73,73,74,74,73,74,73,74,
				73,74,73,74,73,74,73,74,73,73,73,74,73,73,74,74,73,74,73,74,
				0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3];

	this.collision_map = [ 0, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

	this.height   = this.tile_size * this.rows;
	this.width    = this.tile_size * this.columns;

};
  
Game.World.prototype = {
  
	constructor: Game.World,

	collideObject:function(object) {

		if      (object.getLeft()   < 0          ) { object.setLeft(0);             object.velocity_x = 0; }
		else if (object.getRight()  > this.width ) { object.setRight(this.width);   object.velocity_x = 0; }
		if      (object.getTop()    < 0          ) { object.setTop(0);              object.velocity_y = 0; }
		else if (object.getBottom() > this.height) { object.setBottom(this.height); object.velocity_y = 0; object.jumping = false; }

		var bottom, left, right, top, value;

		top    = Math.floor(object.getTop()    / this.tile_size);
		left   = Math.floor(object.getLeft()   / this.tile_size);
		value  = this.collision_map[top * this.columns + left];
		this.collider.collide(value, object, left * this.tile_size, top * this.tile_size, this.tile_size);

		top    = Math.floor(object.getTop()    / this.tile_size);
		right  = Math.floor(object.getRight()  / this.tile_size);
		value  = this.collision_map[top * this.columns + right];
		this.collider.collide(value, object, right * this.tile_size, top * this.tile_size, this.tile_size);
	
		bottom = Math.floor(object.getBottom() / this.tile_size);
		left   = Math.floor(object.getLeft()   / this.tile_size);
		value  = this.collision_map[bottom * this.columns + left];
		this.collider.collide(value, object, left * this.tile_size, bottom * this.tile_size, this.tile_size);


		bottom = Math.floor(object.getBottom() / this.tile_size);
		right  = Math.floor(object.getRight()  / this.tile_size);
		value  = this.collision_map[bottom * this.columns + right];
		this.collider.collide(value, object, right * this.tile_size, bottom * this.tile_size, this.tile_size);

	},

	update:function() {

		this.player.velocity_y += this.gravity;
		this.player.update();

		this.player.velocity_x *= this.friction;
		this.player.velocity_y *= this.friction;

		this.collideObject(this.player);
	}
};

Game.World.Collider = function() {

	this.collide = function(value, object, tile_x, tile_y, tile_size) {

		switch(value) {

			case  1: this.collidePlatformTop      (object, tile_y            ); break;
			case  2: this.collidePlatformRight    (object, tile_x + tile_size); break;
			case  3: if (this.collidePlatformTop  (object, tile_y            )) return;
					this.collidePlatformRight    (object, tile_x + tile_size); break;
			case  4: this.collidePlatformBottom   (object, tile_y + tile_size); break;
			case  5: if (this.collidePlatformTop  (object, tile_y            )) return;
					this.collidePlatformBottom   (object, tile_y + tile_size); break;
			case  6: if (this.collidePlatformRight(object, tile_x + tile_size)) return;
					this.collidePlatformBottom   (object, tile_y + tile_size); break;
			case  7: if (this.collidePlatformTop  (object, tile_y            )) return;
					if (this.collidePlatformRight(object, tile_x + tile_size)) return;
					this.collidePlatformBottom   (object, tile_y + tile_size); break;
			case  8: this.collidePlatformLeft     (object, tile_x            ); break;
			case  9: if (this.collidePlatformTop  (object, tile_y            )) return;
					this.collidePlatformLeft     (object, tile_x            ); break;
			case 10: if (this.collidePlatformLeft (object, tile_x            )) return;
					this.collidePlatformRight    (object, tile_x + tile_size); break;
			case 11: if (this.collidePlatformTop  (object, tile_y            )) return;
					if (this.collidePlatformLeft (object, tile_x            )) return;
					this.collidePlatformRight    (object, tile_x + tile_size); break;
			case 12: if (this.collidePlatformLeft (object, tile_x            )) return;
					this.collidePlatformBottom   (object, tile_y + tile_size); break;
			case 13: if (this.collidePlatformTop  (object, tile_y            )) return;
					if (this.collidePlatformLeft (object, tile_x            )) return;
					this.collidePlatformBottom   (object, tile_y + tile_size); break;
			case 14: if (this.collidePlatformLeft (object, tile_x            )) return;
					if (this.collidePlatformRight(object, tile_x            )) return;
					this.collidePlatformBottom   (object, tile_y + tile_size); break;
			case 15: if (this.collidePlatformTop  (object, tile_y            )) return;
					if (this.collidePlatformLeft (object, tile_x            )) return;
					if (this.collidePlatformRight(object, tile_x + tile_size)) return;
					this.collidePlatformBottom   (object, tile_y + tile_size); break;

		}

	}

};
Game.World.Collider.prototype = {

	constructor: Game.World.Collider,

	collidePlatformBottom:function(object, tile_bottom) {

		if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {

			object.setTop(tile_bottom);// Move the top of the object to the bottom of the tile.
			object.velocity_y = 0;     // Stop moving in that direction.
			return true;               // Return true because there was a collision.

		} return false;              // Return false if there was no collision.

	},

	collidePlatformLeft:function(object, tile_left) {

		if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {

			object.setRight(tile_left - 0.01);// -0.01 is to fix a small problem with rounding
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

	}

};

Game.World.Object = function(x, y, width, height) {
	this.height = height;
	this.width  = width;
	this.x      = x;
	this.x_old  = x;
	this.y      = y;
	this.y_old  = y;
};
  
Game.World.Object.prototype = {

	constructor:Game.World.Object,

	/* These functions are used to get and set the different side positions of the object. */
	getBottom:   function()  { return this.y     + this.height; },
	getLeft:     function()  { return this.x;                   },
	getRight:    function()  { return this.x     + this.width;  },
	getTop:      function()  { return this.y;                   },
	getOldBottom:function()  { return this.y_old + this.height; },
	getOldLeft:  function()  { return this.x_old;               },
	getOldRight: function()  { return this.x_old + this.width;  },
	getOldTop:   function()  { return this.y_old                },
	setBottom:   function(y) { this.y     = y    - this.height; },
	setLeft:     function(x) { this.x     = x;                  },
	setRight:    function(x) { this.x     = x    - this.width;  },
	setTop:      function(y) { this.y     = y;                  },
	setOldBottom:function(y) { this.y_old = y    - this.height; },
	setOldLeft:  function(x) { this.x_old = x;                  },
	setOldRight: function(x) { this.x_old = x    - this.width;  },
	setOldTop:   function(y) { this.y_old = y;                  }

};
  
  
Game.World.Player = function(x, y) {

	Game.World.Object.call(this, 100, 100, 32, 32);

	this.color1     = "#404040";
	this.color2     = "#f0f0f0";

	this.jumping    = true;
	this.velocity_x = 0;
	this.velocity_y = 0;

};
  
Game.World.Player.prototype = {

	jump:function() {
		if (!this.jumping) {
			this.jumping     = true;
			this.velocity_y -= 30;

		}
	},

	moveLeft:function()  { this.velocity_x -= 1.5; },
	moveRight:function() { this.velocity_x += 1.5; },

	update:function() {

		this.x_old = this.x;
		this.y_old = this.y;
		this.x    += this.velocity_x;
		this.y    += this.velocity_y;

	}
};
  
Object.assign(Game.World.Player.prototype, Game.World.Object.prototype);
Game.World.Player.prototype.constructor = Game.World.Player;

