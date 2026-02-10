// update.js

function createUpdater(controller, game, engine, assets_manager) {
  return () => {
    if (controller.left.active) {
      game.world.player.moveLeft();
    }
    if (controller.right.active) {
      game.world.player.moveRight();
    }
    if (controller.squat.active) {
      game.world.player.squat();
    }
    if (controller.attack.active) {
      game.world.player.attack();
    }
    if (controller.up.active) {
      game.world.player.jump();
      controller.up.active = false;
    }
    if (controller.inventory.active) {
      controller.inventory.active = false;
    }
    if (controller.escape.active) {
      controller.escape.active = false;
    }
    if (controller.pause.active) {
      pauseGame();
      controller.pause.active = false;
    }
    game.update();
    if (game.world.door) {
      engine.stop();
      assets_manager.requestJSON(
        ZONE_PREFIX + game.world.door.destination_zone + ZONE_SUFFIX,
        (zone) => {
          game.world.setup(zone);
          engine.start();
        }
      );
      return;
    }
  };
}
