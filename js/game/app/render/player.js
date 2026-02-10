// render_player.js

function renderPlayer(display, assets_manager, game) {
  const frame = game.world.tile_set.frames[game.world.player.frame_value];

  display.drawObject(
    assets_manager.player_image,
    frame.x,
    frame.y,
    game.world.player.x +
      Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) +
      frame.offset_x,
    game.world.player.y + frame.offset_y,
    frame.width,
    frame.height
  );
}
