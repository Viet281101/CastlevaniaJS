// object.js

Object.assign(Display.prototype, {
  drawObject: function (image, source_x, source_y, destination_x, destination_y, width, height) {
    if (image.complete && image.naturalHeight !== 0) {
      this.buffer.drawImage(
        image,
        source_x,
        source_y,
        width,
        height,
        Math.round(destination_x),
        Math.round(destination_y),
        width,
        height
      );
    } else {
      console.warn('Image not loaded:', image.src);
    }
  },
});
