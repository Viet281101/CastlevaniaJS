// renderer.js

function createRenderer(display, assets_manager, game, healthElement) {
  return () => {
    renderMap(display, assets_manager, game);
    renderItems(display, assets_manager, game);
    renderPlayer(display, assets_manager, game);
    renderEnemies(display, assets_manager, game);
    renderUI(healthElement, game);
    display.render();
  };
}
