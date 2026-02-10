// world.js

Game.World = function (friction = 0.85, gravity = 2) {
  this.collider = new Game.Collider();

  this.friction = friction;
  this.gravity = gravity;

  this.columns = 20;
  this.rows = 9;

  this.tile_set = new Game.TileSet(18, 32);
  this.player = new Game.Player(playerPosX, playerPosY);

  this.zone_id = currentZone;

  this.heal_health = [];
  this.monster_normale = [];
  this.monster_jumper = [];
  this.monster_contactjump = [];
  this.monster_fly = [];
  this.health = 20;
  this.cooldown = 0;
  this.doors = [];
  this.door = undefined;

  this.height = this.tile_set.tile_size * this.rows;
  this.width = this.tile_set.tile_size * this.columns;
};
Game.World.prototype = { constructor: Game.World };
