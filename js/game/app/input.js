// input.js

function createKeyHandler(controller) {
  return (event) => {
    controller.keyDownUp(event.type, event.keyCode);
  };
}
