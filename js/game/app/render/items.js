// render_items.js

function renderItems(display, assets_manager, game) {
  let frame = undefined;

  for (let index = game.world.heal_health.length - 1; index > -1; --index) {
    const heal_health = game.world.heal_health[index];
    frame = game.world.tile_set.frames[heal_health.frame_value];

    display.drawObject(
      assets_manager.heal_health_image,
      frame.x,
      frame.y,
      heal_health.x + Math.floor(heal_health.width * 0.5 - frame.width * 0.5) + frame.offset_x,
      heal_health.y + frame.offset_y,
      frame.width,
      frame.height
    );
  }

  for (let index = game.world.torch.length - 1; index > -1; --index) {
    const torch = game.world.torch[index];
    frame = game.world.tile_set.frames[torch.frame_value];

    display.drawObject(
      assets_manager.torch_image,
      frame.x,
      frame.y,
      torch.x + frame.offset_x,
      torch.y + frame.offset_y,
      frame.width,
      frame.height
    );
  }
}
