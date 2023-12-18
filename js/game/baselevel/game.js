
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
				73,74,73,74,73,74,73,74,65,73,73,74,73,73,74,74,73,74,73,74,
				73,74,73,74,73,74,73,74,73,73,73,74,73,73,74,74,73,74,73,74,
				73,74,73,74,73,74,73,74,73,73,73,74,73,73,74,74,73,74,73,74,
				73,74,73,74,73,74,73,74,73,2,73,74,73,73,74,74,73,74,73,74,
				1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3];

	this.collision_map = [ 0, 4, 4, 4, 0, 0, 4, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
							1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

	this.height   = this.tile_size * this.rows;
	this.width    = this.tile_size * this.columns;

	this.ennemie = new Game.World.Ennemie(400, 100);
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


		this.ennemie.velocity_y += this.gravity;
		this.ennemie.update(this.player);

		this.ennemie.velocity_x *= this.friction;
		this.ennemie.velocity_y *= this.friction;

		this.collideObject(this.player);
		this.collideObject(this.ennemie);
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
			case 16: if (this.collidePlatformTop  (object, tile_y            )) return;
					 if (this.collidePlatformLeft (object, tile_x            )) return;
					 if (this.collidePlatformRight(object, tile_x + tile_size)) return;
					 this.collidePlatformSolid(object, (tile_x + 1) * tile_size, tile_x * tile_size, tile_y * tile_size, (tile_y + 1) * tile_size); break;
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

	},

	collidePlatformSolid: function(object, tile_right, tile_left, tile_top, tile_bottom) {
		// Collision horizontale
		if (this.collidePlatformLeft(object, tile_left, tile_right)) {
			return;
		}
		if (this.collidePlatformRight(object, tile_right, tile_left)) {
			return;
		}

		// Collision verticale
		if (this.collidePlatformTop(object, tile_top, tile_bottom)) {
			return;
		}
		if (this.collidePlatformBottom(object, tile_bottom, tile_top)) {
			return;
		}
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

	getHitbox: function() {
        return {
            left: this.getLeft(),
            right: this.getRight(),
            top: this.getTop(),
            bottom: this.getBottom()
        };
    },

    getHurtbox: function() {
        // Définissez la Hurtbox en fonction de la Hitbox ou ajustez selon vos besoins
        const hitbox = this.getHitbox();
        return {
            left: hitbox.left,
            right: hitbox.right,
            top: hitbox.top,
            bottom: hitbox.bottom
        };
    },

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


Game.World.Ennemie = function(x, y) {

	Game.World.Object.call(this, x, y, 32, 32);

	this.color1     = "#f22525";
	this.color2     = "#c53232";

	this.velocity_x = 0;
	this.velocity_y = 0;

};

Game.World.Ennemie.prototype = {

	constructor: Game.World.Ennemie,

	getHitbox: function() {
        return {
            left: this.getLeft(),
            right: this.getRight(),
            top: this.getTop(),
            bottom: this.getBottom()
        };
    },

    getHurtbox: function() {
        // Définissez la Hurtbox en fonction de la Hitbox ou ajustez selon vos besoins
        const hitbox = this.getHitbox();
        return {
            left: hitbox.left,
            right: hitbox.right,
            top: hitbox.top,
            bottom: hitbox.bottom
        };
    },

	collideWithPlayer: function(player) {
        const ennemieHitbox = this.getHitbox();
        const playerHurtbox = player.getHurtbox();

        return (
            ennemieHitbox.left < playerHurtbox.right &&
            ennemieHitbox.right > playerHurtbox.left &&
            ennemieHitbox.top < playerHurtbox.bottom &&
            ennemieHitbox.bottom > playerHurtbox.top
        );
    },

    update: function(player) {
        // Suivre la position horizontale du joueur
        if (!this.collideWithPlayer(player)) {
            if (this.x < player.x) {
                this.velocity_x = 2; // Ajustez la vitesse de l'ennemi en fonction de vos besoins
            } else if (this.x > player.x) {
                this.velocity_x = -2; // Ajustez la vitesse de l'ennemi en fonction de vos besoins
            } else {
                this.velocity_x = 0;
            }
        } else {
            this.velocity_x = 0; // Arrêter le mouvement en cas de collision avec le joueur
        }

        // Mettez à jour la position de l'ennemi
        this.x_old = this.x;
        this.y_old = this.y;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }
};


Game.World.EnnemieSauteur = function(x, y, tile_size) {

	Game.World.Object.call(this, x, y, 32, 32);

	this.color1     = "#f22525";
	this.color2     = "#c53232";

	this.tile_size  = tile_size; // Add this line to set the tile_size property

	this.jumping    = true;
	this.velocity_x = 0;
	this.velocity_y = 0;

};

Game.World.EnnemieSauteur.prototype = {
    constructor: Game.World.EnnemieSauteur,

    jump: function() {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= 30;
        }
    },

    getHitbox: function() {
        return {
            left: this.getLeft(),
            right: this.getRight(),
            top: this.getTop(),
            bottom: this.getBottom()
        };
    },

    getHurtbox: function() {
        // Définissez la Hurtbox en fonction de la Hitbox ou ajustez selon vos besoins
        const hitbox = this.getHitbox();
        return {
            left: hitbox.left,
            right: hitbox.right,
            top: hitbox.top,
            bottom: hitbox.bottom
        };
    },

	collideWithPlayer: function(player) {
        const ennemieHitbox = this.getHitbox();
        const playerHurtbox = player.getHurtbox();

        return (
            ennemieHitbox.left < playerHurtbox.right &&
            ennemieHitbox.right > playerHurtbox.left &&
            ennemieHitbox.top < playerHurtbox.bottom &&
            ennemieHitbox.bottom > playerHurtbox.top
        );
    },

    update: function(player) {
		// Suivre la position horizontale du joueur
		if (!this.collideWithPlayer(player)) {
			const originalX = this.x; // Mémoriser la position actuelle
	
			if (this.x < player.x) {
				this.velocity_x = 2; // Ajustez la vitesse de l'ennemi en fonction de vos besoins
			} else if (this.x > player.x) {
				this.velocity_x = -2; // Ajustez la vitesse de l'ennemi en fonction de vos besoins
			} else {
				this.velocity_x = 0;
			}
	
			this.x_old = originalX; // Restaurer la position actuelle après mise à jour de la vélocité
		} else {
			this.velocity_x = 0; // Arrêter le mouvement en cas de collision avec le joueur
		}
	
		// Vérifier si l'ennemi est bloqué dans sa position (collision avec un mur)
		if (this.x === this.x_old) {
			// Il est bloqué, donc saute
			this.jump();
		}
	
		// Mettez à jour la position de l'ennemi
		this.x_old = this.x;
		this.y_old = this.y;
		this.x += this.velocity_x;
		this.y += this.velocity_y;
	}	
};

Game.World.EnnemieJumpContact = function(x, y, tile_size) {

	Game.World.Object.call(this, x, y, 32, 32);

	this.color1     = "#f22525";
	this.color2     = "#c53232";

	this.tile_size  = tile_size; // Add this line to set the tile_size property

	this.jumping    = true;
	this.velocity_x = 0;
	this.velocity_y = 0;

};

Game.World.EnnemieJumpContact.prototype = {
    constructor: Game.World.EnnemieSauteur,

    jump: function() {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= 30;
        }
    },

    getHitbox: function() {
        return {
            left: this.getLeft(),
            right: this.getRight(),
            top: this.getTop(),
            bottom: this.getBottom()
        };
    },

    getHurtbox: function() {
        // Définissez la Hurtbox en fonction de la Hitbox ou ajustez selon vos besoins
        const hitbox = this.getHitbox();
        return {
            left: hitbox.left,
            right: hitbox.right,
            top: hitbox.top,
            bottom: hitbox.bottom
        };
    },

	collideWithPlayer: function(player) {
        const ennemieHitbox = this.getHitbox();
        const playerHurtbox = player.getHurtbox();

        return (
            ennemieHitbox.left < playerHurtbox.right &&
            ennemieHitbox.right > playerHurtbox.left &&
            ennemieHitbox.top < playerHurtbox.bottom &&
            ennemieHitbox.bottom > playerHurtbox.top
        );
    },

    update: function(player) {
		// Suivre la position horizontale du joueur
		if (!this.collideWithPlayer(player)) {
			const originalX = this.x; // Mémoriser la position actuelle
	
			if (this.x < player.x) {
				this.velocity_x = 2; // Ajustez la vitesse de l'ennemi en fonction de vos besoins
			} else if (this.x > player.x) {
				this.velocity_x = -2; // Ajustez la vitesse de l'ennemi en fonction de vos besoins
			} else {
				this.velocity_x = 0;
			}
	
			this.x_old = originalX; // Restaurer la position actuelle après mise à jour de la vélocité
		} else {
			this.velocity_x = 0; // Arrêter le mouvement en cas de collision avec le joueur
		}
	
		// Vérifier si l'ennemi est bloqué dans sa position (collision avec un mur)
		if (this.velocity_x > 0 && this.x_old == this.x) {
			// Il est bloqué, donc saute
			this.jump();
		}
	
		// Mettez à jour la position de l'ennemi
		this.x_old = this.x;
		this.y_old = this.y;
		this.x += this.velocity_x;
		this.y += this.velocity_y;
	}	
};

Game.World.EnnemieVolant = function(x, y) {

	Game.World.Object.call(this, x, y, 32, 32);

	this.color1     = "#f22525";
	this.color2     = "#c53232";

	this.velocity_x = 0;
	this.velocity_y = 0;
	this.speed = 2; // Adjust the speed of the flying enemy as needed

};

Game.World.EnnemieVolant.prototype = {

	constructor: Game.World.EnnemieVolant,

	getHitbox: function() {
        return {
            left: this.getLeft(),
            right: this.getRight(),
            top: this.getTop(),
            bottom: this.getBottom()
        };
    },

    getHurtbox: function() {
        // Définissez la Hurtbox en fonction de la Hitbox ou ajustez selon vos besoins
        const hitbox = this.getHitbox();
        return {
            left: hitbox.left,
            right: hitbox.right,
            top: hitbox.top,
            bottom: hitbox.bottom
        };
    },

	collideWithPlayer: function(player) {
        const ennemieHitbox = this.getHitbox();
        const playerHurtbox = player.getHurtbox();

        return (
            ennemieHitbox.left < playerHurtbox.right &&
            ennemieHitbox.right > playerHurtbox.left &&
            ennemieHitbox.top < playerHurtbox.bottom &&
            ennemieHitbox.bottom > playerHurtbox.top
        );
    },

    update: function(player) {
        // Suivre la position horizontale et verticale du joueur
        if (!this.collideWithPlayer(player)) {
            // Suivre la position horizontale
            if (this.x < player.x) {
                this.velocity_x = this.speed; // Ajustez la vitesse de l'ennemi en fonction de vos besoins
            } else if (this.x > player.x) {
                this.velocity_x = -this.speed; // Ajustez la vitesse de l'ennemi en fonction de vos besoins
            } else {
                this.velocity_x = 0;
            }

            // Suivre la position verticale
            if (this.y < player.y) {
                this.velocity_y = this.speed; // Ajustez la vitesse de l'ennemi en fonction de vos besoins
            } else if (this.y > player.y) {
                this.velocity_y = -this.speed; // Ajustez la vitesse de l'ennemi en fonction de vos besoins
            } else {
                this.velocity_y = 0;
            }
        } else {
            this.velocity_x = 0; // Arrêter le mouvement horizontal en cas de collision avec le joueur
            this.velocity_y = 0; // Arrêter le mouvement vertical en cas de collision avec le joueur
        }

        // Mettez à jour la position de l'ennemi
        this.x_old = this.x;
        this.y_old = this.y;
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }
};

Object.assign(Game.World.Player.prototype, Game.World.Object.prototype);
Object.assign(Game.World.Ennemie.prototype, Game.World.Object.prototype);
Object.assign(Game.World.EnnemieSauteur.prototype, Game.World.Object.prototype);
Object.assign(Game.World.EnnemieJumpContact.prototype, Game.World.Object.prototype);
Object.assign(Game.World.EnnemieVolant.prototype, Game.World.Object.prototype);
Object.assign(Game.World.EnnemiePathfinding.prototype, Game.World.Object.prototype);
Game.World.Player.prototype.constructor = Game.World.Player;

