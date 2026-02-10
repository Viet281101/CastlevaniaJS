// update_enemies.js

Object.assign(Game.World.prototype, {
  updateEnemies: function () {
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
  },
});
