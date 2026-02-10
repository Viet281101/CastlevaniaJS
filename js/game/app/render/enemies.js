// render_enemies.js

function renderEnemies(display, assets_manager, game) {
  let frame = undefined;

  for (let index = game.world.monster_normale.length - 1; index > -1; --index) {
    const monster_normale = game.world.monster_normale[index];
    frame = game.world.tile_set.frames[monster_normale.frame_value];
    display.drawObject(
      assets_manager.nightmare_image,
      frame.x,
      frame.y,
      monster_normale.x +
        Math.floor(monster_normale.width * 0.5 - frame.width * 0.5) +
        frame.offset_x,
      monster_normale.y + frame.offset_y,
      frame.width,
      frame.height
    );
  }

  for (let index = game.world.monster_contactjump.length - 1; index > -1; --index) {
    const monster_contactjump = game.world.monster_contactjump[index];
    frame = game.world.tile_set.frames[monster_contactjump.frame_value];
    display.drawObject(
      assets_manager.dark_skull_image,
      frame.x,
      frame.y,
      monster_contactjump.x +
        Math.floor(monster_contactjump.width * 0.5 - frame.width * 0.5) +
        frame.offset_x,
      monster_contactjump.y + frame.offset_y,
      frame.width,
      frame.height
    );
  }

  for (let index = game.world.monster_fly.length - 1; index > -1; --index) {
    const monster_fly = game.world.monster_fly[index];
    frame = game.world.tile_set.frames[monster_fly.frame_value];
    display.drawObject(
      assets_manager.ghost_image,
      frame.x,
      frame.y,
      monster_fly.x + Math.floor(monster_fly.width * 0.5 - frame.width * 0.5) + frame.offset_x,
      monster_fly.y + frame.offset_y,
      frame.width,
      frame.height
    );
  }

  for (let index = game.world.monster_jumper.length - 1; index > -1; --index) {
    const monster_jumper = game.world.monster_jumper[index];
    frame = game.world.tile_set.frames[monster_jumper.frame_value];
    display.drawObject(
      assets_manager.fire_skull_image,
      frame.x,
      frame.y,
      monster_jumper.x +
        Math.floor(monster_jumper.width * 0.5 - frame.width * 0.5) +
        frame.offset_x,
      monster_jumper.y + frame.offset_y,
      frame.width,
      frame.height
    );
  }
}
