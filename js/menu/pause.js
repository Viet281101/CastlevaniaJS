class MenuPause {
  constructor() {
    this.pause_menu = document.getElementById('pauseMenu');
    this.resumeButton = document.getElementById('resumeButton');
    this.restartButton = document.getElementById('restartButton');
    this.quitButton = document.getElementById('quitButton');

    // Event listener for pausing the game and showing the menu

    // Event listeners for menu buttons
    this.resumeButton.addEventListener('click', () => this.hide());
    this.restartButton.addEventListener('click', () => this.restart());
    this.quitButton.addEventListener('click', () => this.quit());
  }

  show() {
    this.pause_menu.style.display = 'block';
    // Pause your game logic here
  }

  hide() {
    this.pause_menu.style.display = 'none';
    // Resume your game logic here
  }

  restart() {
    // Add logic to restart the game
  }

  quit() {
    // Add logic to quit the game
  }
}

function initPauseMenu() {
  const pauseMenu = new MenuPause();
  return pauseMenu;
}
