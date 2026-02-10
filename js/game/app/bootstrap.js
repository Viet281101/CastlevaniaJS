// bootstrap.js

window.addEventListener('load', () => {
  'use strict';

  const controller = new Controller();
  const display = new Display(document.querySelector('canvas'));
  const game = new Game();

  const resize = () => {
    display.resize(
      document.documentElement.clientWidth - 16,
      document.documentElement.clientHeight - 16,
      game.world.height / game.world.width
    );
    display.render();
  };

  const engine = new Engine(1000 / 40, null, null);
  const assets_manager = new AssetsManager(() => {
    resize();
    engine.start();
  });

  const healthElement = createHealthDisplay();
  const render = createRenderer(display, assets_manager, game, healthElement);
  const update = createUpdater(controller, game, engine, assets_manager);

  engine.render = render;
  engine.update = update;

  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;
  display.buffer.imageSmoothingEnabled = false;

  playMusic(gameLvl1Music);

  assets_manager.requestJSON(ZONE_PREFIX + game.world.zone_id + ZONE_SUFFIX, (zone) => {
    game.world.setup(zone);

    assets_manager.requestImage(ASSET_PATHS.tile_set, (image) => {
      assets_manager.tile_set_image = image;
    });
    assets_manager.requestImage(ASSET_PATHS.player, (image) => {
      assets_manager.player_image = image;
    });
    assets_manager.requestImage(ASSET_PATHS.heal_health, (image) => {
      assets_manager.heal_health_image = image;
    });
    assets_manager.requestImage(ASSET_PATHS.torch, (image) => {
      assets_manager.torch_image = image;
    });
    assets_manager.requestImage(ASSET_PATHS.fire_skull, (image) => {
      assets_manager.fire_skull_image = image;
    });
    assets_manager.requestImage(ASSET_PATHS.dark_skull, (image) => {
      assets_manager.dark_skull_image = image;
    });
    assets_manager.requestImage(ASSET_PATHS.nightmare, (image) => {
      assets_manager.nightmare_image = image;
    });
    assets_manager.requestImage(ASSET_PATHS.ghost, (image) => {
      assets_manager.ghost_image = image;
    });
  });

  const keyDownUp = createKeyHandler(controller);
  window.addEventListener('keydown', keyDownUp);
  window.addEventListener('keyup', keyDownUp);
  window.addEventListener('resize', resize);
});
