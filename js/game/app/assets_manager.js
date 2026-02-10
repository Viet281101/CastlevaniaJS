// assets_manager.js

class AssetsManager {
  constructor(onAllImagesLoaded) {
    this.tile_set_image = undefined;
    this.player_image = undefined;
    this.heal_health_image = undefined;
    this.torch_image = undefined;
    this.fire_skull_image = undefined;
    this.nightmare_image = undefined;
    this.dark_skull_image = undefined;
    this.ghost_image = undefined;
    this.imagesLoaded = 0;
    this.totalImages = 8;
    this.onAllImagesLoaded = onAllImagesLoaded;
  }

  requestJSON(url, callback) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => console.error('Failed to load JSON:', error));
  }

  requestImage(url, callback) {
    const image = new Image();
    image.onload = () => {
      callback(image);
      this.imagesLoaded++;
      if (this.imagesLoaded === this.totalImages && typeof this.onAllImagesLoaded === 'function') {
        this.onAllImagesLoaded();
      }
    };
    image.src = url;
  }
}
