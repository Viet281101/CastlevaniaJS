// render_map.js

function renderMap(display, assets_manager, game) {
  display.drawMap(
    assets_manager.tile_set_image,
    game.world.tile_set.columns,
    game.world.graphical_map,
    game.world.columns,
    game.world.tile_set.tile_size
  );
}
