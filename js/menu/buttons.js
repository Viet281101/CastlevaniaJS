//////*  Create menu buttons after remove intro element  *//////
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('introAnimationEnded', () => {
    createMenuButtons();
    createFullscreenButton();
  });
});

//////* Start Sound Script  *//////
function loadSoundScript(src) {
  return new Promise((resolve, reject) => {
    const soundScript = document.createElement('script');
    soundScript.setAttribute('type', 'text/javascript');
    soundScript.setAttribute('src', src);
    soundScript.onload = () => resolve(soundScript);
    soundScript.onerror = () => reject(new Error(`Script load error for ${src}.`));
    document.head.appendChild(soundScript);
  });
}
async function loadSoundAttachButtons() {
  try {
    await loadSoundScript('./js/sound/sound.js');
    attachMenuButtonEvents();
  } catch (e) {
    console.log(e);
  }
}

//////*  Create menu buttons   *//////
function createMenuButtons() {
  buttonApearKeyFrames();
  const buttonContainer = document.createElement('div');
  Object.assign(buttonContainer.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 3,
  });
  const buttons = ['Start', 'Demo', 'Credit', 'Setting', 'Quit'];
  buttons.forEach((buttonText) => {
    const button = document.createElement('button');
    button.className = 'menuButton';
    button.id = buttonText.toLowerCase() + 'Button';
    button.textContent = buttonText;
    button.style.animation = 'buttonApear 2s ease-out forwards';
    buttonContainer.appendChild(button);
  });
  document.body.appendChild(buttonContainer);
  loadSoundAttachButtons();
}
function buttonApearKeyFrames() {
  const styleSheet = document.createElement('style');
  styleSheet.setAttribute('type', 'text/css');
  styleSheet.innerText = `@keyframes buttonApear { 0% {opacity: 0;} 100% {opacity: 1;} }`;
  document.head.appendChild(styleSheet);
}

//////* ----------  Attach menu button events ----------- *//////
function attachMenuButtonEvents() {
  const transitionEffect = new TransitionEffect();
  //////*  Start button   *//////
  document.getElementById('startButton').addEventListener('click', () => {
    silentAudio.play().catch((error) => {
      console.log('Autoplay prevented for silent audio. Initiating playback on user action.');
    });
    transitionEffect.start('game.html?01');
    clickSound.play();
    stopMusic(mainMenuMusic);
  });

  //////*  Demo button   *//////
  document.getElementById('demoButton').addEventListener('click', () => {
    clickSound.play();
    stopMusic(mainMenuMusic);
    transitionEffect.start('./Demo.webm');
  });

  //////*  Credits button   *//////
  document.getElementById('creditButton').addEventListener('click', () => {
    clickSound.play();
    stopMusic(mainMenuMusic);
    const menuCreditScript = document.createElement('script');
    menuCreditScript.setAttribute('type', 'text/javascript');
    menuCreditScript.setAttribute('src', './js/menu/credits.js');
    document.body.appendChild(menuCreditScript);
    transitionEffect.start(() => {
      const creditMenu = new CreditMenu();
      creditMenu.show();
    });
  });

  //////*  Settings button   *//////
  document.getElementById('settingButton').addEventListener('click', () => {
    clickSound.play();
    const menuSettingScript = document.createElement('script');
    menuSettingScript.setAttribute('type', 'text/javascript');
    menuSettingScript.setAttribute('src', './js/menu/settings.js');
    document.body.appendChild(menuSettingScript);
    transitionEffect.start(() => {
      const settingMenu = new SettingsMenu();
      settingMenu.show();
    });
  });

  //////*  Quit button   *//////
  document.getElementById('quitButton').addEventListener('click', () => {
    clickSound.play();
    stopMusic(mainMenuMusic);
    if (confirm('Are you sure you want to quit?')) {
      transitionEffect.start(() => {
        try {
          window.close();
        } catch (e) {
          alert("You can't close this window! Please close the browser tab instead.");
        }
      });
    }
  });

  //////*  Hover effect   *//////
  const menuButtons = document.querySelectorAll('.menuButton');
  let originColor = true;
  menuButtons.forEach((button) => {
    const textSize = parseInt(window.getComputedStyle(button).fontSize);
    const textSizeHover = textSize + textSize * 0.05;
    button.setAttribute('title', button.textContent);
    button.addEventListener('mouseover', () => {
      button.style.fontSize = textSizeHover + 'px';
      button.style.textShadow = '0 0 10px #f6f2ff';
      button.style.color = 'rgb(0, 0, 0)';
      hoverSound.play();
    });
    button.addEventListener('mouseout', () => {
      button.style.fontSize = textSize + 'px';
      button.style.textShadow = 'none';
      if (originColor) button.style.color = 'rgb(192, 98, 40)';
    });
    document.addEventListener('mousedown', () => {
      button.style.color = 'rgb(0, 0, 0)';
      originColor = false;
    });
    document.addEventListener('mouseup', () => {
      button.style.color = 'rgb(192, 98, 40)';
      originColor = true;
    });
  });
}

//////*  FullScreen button   *//////
function createFullscreenButton() {
  const fullscreenContainer = document.createElement('button');
  fullscreenContainer.id = 'fullscreenContainer';
  const fullscreenImage = document.createElement('img');
  Object.assign(fullscreenImage.style, {
    width: 'auto',
    height: '50px',
  });
  // fullscreenImage.src = './assets/UI/zoom_out.png';
  fullscreenImage.src = './assets/UI/fullscreen.png';
  fullscreenImage.alt = 'fullscreen';
  fullscreenImage.setAttribute('title', 'Fullscreen');
  fullscreenContainer.appendChild(fullscreenImage);
  fullscreenContainer.addEventListener('click', () => {
    clickSound.play();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
      // fullscreenImage.src = './assets/UI/zoom_in.png';
    }
  });
  document.body.appendChild(fullscreenContainer);
}
