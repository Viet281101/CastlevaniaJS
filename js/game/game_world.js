// game_world.js

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
Game.World.prototype = {
  constructor: Game.World,
  collideObject: function (object) {
    let bottom, left, right, top, value;

    top = Math.floor(object.getTop() / this.tile_set.tile_size);
    left = Math.floor(object.getLeft() / this.tile_set.tile_size);
    value = this.collision_map[top * this.columns + left];
    this.collider.collide(
      value,
      object,
      left * this.tile_set.tile_size,
      top * this.tile_set.tile_size,
      this.tile_set.tile_size
    );

    top = Math.floor(object.getTop() / this.tile_set.tile_size);
    right = Math.floor(object.getRight() / this.tile_set.tile_size);
    value = this.collision_map[top * this.columns + right];
    this.collider.collide(
      value,
      object,
      right * this.tile_set.tile_size,
      top * this.tile_set.tile_size,
      this.tile_set.tile_size
    );

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    left = Math.floor(object.getLeft() / this.tile_set.tile_size);
    value = this.collision_map[bottom * this.columns + left];
    this.collider.collide(
      value,
      object,
      left * this.tile_set.tile_size,
      bottom * this.tile_set.tile_size,
      this.tile_set.tile_size
    );

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    right = Math.floor(object.getRight() / this.tile_set.tile_size);
    value = this.collision_map[bottom * this.columns + right];
    this.collider.collide(
      value,
      object,
      right * this.tile_set.tile_size,
      bottom * this.tile_set.tile_size,
      this.tile_set.tile_size
    );
  },

  setup: function (zone) {
    this.heal_health = new Array();
    this.monster_normale = new Array();
    this.monster_jumper = new Array();
    this.monster_contactjump = new Array();
    this.monster_fly = new Array();
    this.torch = new Array();
    this.doors = new Array();
    this.collision_map = zone.collision_map;
    this.graphical_map = zone.graphical_map;
    this.columns = zone.columns;
    this.rows = zone.rows;
    this.zone_id = zone.id;
    /* Generate items heal_health */
    for (let index = zone.heal_health.length - 1; index > -1; --index) {
      const heal_health = zone.heal_health[index];
      this.heal_health[index] = new Game.HealHealth(
        heal_health[0] * this.tile_set.tile_size + 5,
        heal_health[1] * this.tile_set.tile_size - 2
      );
    }
    /* Generate new torchs. */
    for (let index = zone.torch.length - 1; index > -1; --index) {
      const torch = zone.torch[index];
      this.torch[index] = new Game.Torch(
        torch[0] * this.tile_set.tile_size,
        torch[1] * this.tile_set.tile_size + 12
      );
    }
    /* Generate new normal monster. */
    for (let index = zone.monster_normale.length - 1; index > -1; --index) {
      const monster_normale = zone.monster_normale[index];
      this.monster_normale[index] = new Game.Ennemie(
        monster_normale[0] * this.tile_set.tile_size,
        monster_normale[1] * this.tile_set.tile_size
      );
    }
    /* Generate new flying monster. */
    for (let index = zone.monster_fly.length - 1; index > -1; --index) {
      const monster_fly = zone.monster_fly[index];
      this.monster_fly[index] = new Game.EnnemieVolant(
        monster_fly[0] * this.tile_set.tile_size,
        monster_fly[1] * this.tile_set.tile_size
      );
    }
    /* Generate new jumping monster. */
    for (let index = zone.monster_jumper.length - 1; index > -1; --index) {
      const monster_jumper = zone.monster_jumper[index];
      this.monster_jumper[index] = new Game.EnnemieSauteur(
        monster_jumper[0] * this.tile_set.tile_size,
        monster_jumper[1] * this.tile_set.tile_size
      );
    }
    /* Generate new jumping contact monster. */
    for (let index = zone.monster_contactjump.length - 1; index > -1; --index) {
      const monster_contactjump = zone.monster_contactjump[index];
      this.monster_contactjump[index] = new Game.EnnemieJumpContact(
        monster_contactjump[0] * this.tile_set.tile_size,
        monster_contactjump[1] * this.tile_set.tile_size
      );
    }
    /* Generate new doors. */
    for (let index = zone.doors.length - 1; index > -1; --index) {
      const door = zone.doors[index];
      this.doors[index] = new Game.Door(door);
    }
    if (this.door) {
      if (this.door.destination_x != -1) {
        this.player.setCenterX(this.door.destination_x);
        this.player.setOldCenterX(this.door.destination_x);
      }
      if (this.door.destination_y != -1) {
        this.player.setCenterY(this.door.destination_y);
        this.player.setOldCenterY(this.door.destination_y);
      }
      this.door = undefined;
    }
  },

  update: function () {
    this.player.updatePosition(this.gravity, this.friction);
    this.collideObject(this.player);

    for (let index = this.heal_health.length - 1; index > -1; --index) {
      const heal_health = this.heal_health[index];
      heal_health.updatePosition();
      heal_health.animate();
      if (heal_health.collideObject(this.player)) {
        this.heal_health.splice(this.heal_health.indexOf(heal_health), 1);
        this.health += 1;
      }
    }

    for (let index = this.torch.length - 1; index > -1; --index) {
      const torch = this.torch[index];
      torch.animate();
    }

    for (let index = this.doors.length - 1; index > -1; --index) {
      const door = this.doors[index];
      if (door.collideObjectCenter(this.player)) {
        this.door = door;
      }
    }
    this.player.updateAnimation();

    for (let index = this.monster_normale.length - 1; index > -1; --index) {
      const monster_normale = this.monster_normale[index];
      this.collideObject(monster_normale);
      monster_normale.animate();
      monster_normale.updatePosition(this.gravity, this.friction, this.player, this.health);
      if (monster_normale.collideObject(this.player)) {
        if (
          this.player.attacking == true &&
          this.player.direction_x != monster_normale.direction_x
        ) {
          this.monster_normale.splice(this.monster_normale.indexOf(monster_normale), 1);
          if (Math.random() < 0.2) {
            this.heal_health.push(new Game.HealHealth(monster_normale.x, monster_normale.y));
          }
        } else if (this.cooldown == 0) {
          this.health -= 1;
          this.cooldown = 50;
        }
      }
    }

    for (let index = this.monster_contactjump.length - 1; index > -1; --index) {
      const monster_contactjump = this.monster_contactjump[index];
      this.collideObject(monster_contactjump);
      monster_contactjump.animate();
      monster_contactjump.updatePosition(this.gravity, this.friction, this.player);
      if (monster_contactjump.collideObject(this.player)) {
        if (
          this.player.attacking == true &&
          this.player.direction_x != monster_contactjump.direction_x
        ) {
          this.monster_contactjump.splice(this.monster_contactjump.indexOf(monster_contactjump), 1);
          if (Math.random() < 0.5) {
            this.heal_health.push(
              new Game.HealHealth(monster_contactjump.x, monster_contactjump.y)
            );
          }
        } else if (this.cooldown == 0) {
          this.health -= 1;
          this.cooldown = 50;
        }
      }
    }

    for (let index = this.monster_fly.length - 1; index > -1; --index) {
      const monster_fly = this.monster_fly[index];
      this.collideObject(monster_fly);
      monster_fly.animate();
      monster_fly.updatePosition(this.gravity, this.friction, this.player);
      if (monster_fly.collideObject(this.player)) {
        monster_fly.attack = true;
        if (this.player.attacking == true && this.player.direction_x != monster_fly.direction_x) {
          if (this.cooldown == 0) {
            monster_fly.ghost_health -= 1;
            this.cooldown = 50;
          }
        } else if (this.cooldown == 0) {
          this.health -= 1;
          this.cooldown = 50;
        }
      }
      if (monster_fly.ghost_health <= 0) {
        this.monster_fly.splice(this.monster_fly.indexOf(monster_fly), 1);
        if (Math.random() < 0.3) {
          this.heal_health.push(new Game.HealHealth(monster_fly.x, monster_fly.y));
        }
      }
    }

    for (let index = this.monster_jumper.length - 1; index > -1; --index) {
      const monster_jumper = this.monster_jumper[index];
      this.collideObject(monster_jumper);
      monster_jumper.animate();
      monster_jumper.updatePosition(this.gravity, this.friction, this.player);
      if (monster_jumper.collideObject(this.player)) {
        if (
          this.player.attacking == true &&
          this.player.direction_x != monster_jumper.direction_x
        ) {
          this.monster_jumper.splice(this.monster_jumper.indexOf(monster_jumper), 1);
          if (Math.random() < 0.3) {
            this.heal_health.push(new Game.HealHealth(monster_jumper.x, monster_jumper.y));
          }
        } else if (this.cooldown == 0) {
          this.health -= 1;
          this.cooldown = 50;
        }
      }
    }

    if (this.cooldown > 0) {
      this.cooldown -= 1;
    }

    if (this.health <= 0) {
      document.location.reload(true);
    }
  },
};
