////// For the settings page //////
////// Settings sounds, musics, languages, light and key controls, etc. //////

class SettingsMenu {
  constructor() {
    if (typeof this.transitionEffect !== 'undefined') {
      this.transitionEffect = new TransitionEffect();
    }
  }

  show() {
    const existingCanvas = document.getElementById('canvas');
    if (existingCanvas) {
      // existingCanvas.style.display = 'none';
      existingCanvas.remove();
    }
    document.body.innerHTML = '';
    document.body.style.backgroundColor = 'black';
    this.loadTransitionScript();
    this.addBackButton();
    this.settingsMenuContent();
    this.settingsParameters();
    //// Butterfly ////
    const newCanvas = document.createElement('canvas');
    newCanvas.id = 'butterflyCanvas';
    newCanvas.style.position = 'absolute';
    newCanvas.style.zIndex = '1';
    document.body.appendChild(newCanvas);
    this.loadButterflyScript();
  }

  settingsMenuContent() {
    const settingsContainer = document.createElement('div');
    Object.assign(settingsContainer.style, {
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      fontSize: '40px',
      background: '-webkit-linear-gradient(#ffffcc, #ecc400)',
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    });
    settingsContainer.innerHTML = `<h1>Settings</h1>`;
    document.body.appendChild(settingsContainer);
  }

  settingsParameters() {
    const settingsTable = document.createElement('table');
    Object.assign(settingsTable.style, {
      zIndex: '2',
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: '30%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      fontSize: '25px',
      background: '-webkit-linear-gradient(#ffffcc, #ecc400)',
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    });
    const settingsRows = [];

    const volumeRow = document.createElement('tr');
    const volumeLabel = document.createElement('td');
    volumeLabel.textContent = 'Volume:';
    const volumeInput = document.createElement('input');
    volumeInput.type = 'range';
    volumeInput.min = '0';
    volumeInput.max = '100';
    volumeInput.value = '50';
    volumeRow.appendChild(volumeLabel);
    volumeRow.appendChild(volumeInput);
    settingsRows.push(volumeRow);

    const soundRow = document.createElement('tr');
    const soundLabel = document.createElement('td');
    soundLabel.textContent = 'Sound:';
    const soundButton = document.createElement('img');
    soundButton.src = './assets/UI/unmute.png';
    soundButton.className = 'mute-button';
    soundButton.style.width = '30px';
    soundButton.style.height = '30px';
    soundRow.appendChild(soundLabel);
    soundRow.appendChild(soundButton);
    settingsRows.push(soundRow);

    const fullscreenRow = document.createElement('tr');
    const fullscreenLabel = document.createElement('td');
    fullscreenLabel.textContent = 'Fullscreen:';
    const fullscreenInput = document.createElement('input');
    fullscreenInput.type = 'checkbox';
    fullscreenInput.className = 'fullscreen-checkbox';
    fullscreenRow.appendChild(fullscreenLabel);
    fullscreenRow.appendChild(fullscreenInput);
    settingsRows.push(fullscreenRow);

    const themeRow = document.createElement('tr');
    const themeLabel = document.createElement('td');
    themeLabel.textContent = 'Theme:';
    const themeSelect = document.createElement('select');
    const defaultOption = document.createElement('option');
    defaultOption.value = 'default';
    defaultOption.textContent = 'Default';
    themeSelect.appendChild(defaultOption);
    const darkOption = document.createElement('option');
    darkOption.value = 'dark';
    darkOption.textContent = 'Dark';
    themeSelect.appendChild(darkOption);
    const lightOption = document.createElement('option');
    lightOption.value = 'light';
    lightOption.textContent = 'Light';
    themeSelect.appendChild(lightOption);
    themeRow.appendChild(themeLabel);
    themeRow.appendChild(themeSelect);
    settingsRows.push(themeRow);

    const langRow = document.createElement('tr');
    const langLabel = document.createElement('td');
    langLabel.textContent = 'Language:';
    const langSelect = document.createElement('select');
    const englishOption = document.createElement('option');
    englishOption.value = 'english';
    englishOption.textContent = 'English';
    langSelect.appendChild(englishOption);
    const francaisOption = document.createElement('option');
    francaisOption.value = 'francais';
    francaisOption.textContent = 'Français';
    langSelect.appendChild(francaisOption);
    langRow.appendChild(langLabel);
    langRow.appendChild(langSelect);
    settingsRows.push(langRow);

    const controlsRow = document.createElement('tr');
    const controlsLabel = document.createElement('td');
    controlsLabel.textContent = 'Controls:';
    const controlsText = document.createElement('div');
    controlsText.textContent =
      '&uarr;: Sauter\n&darr;: Accroupie\n&larr;: Gauche\n&rarr;: Droite\nEspace: Attaquer\nP : Pause';
    controlsRow.appendChild(controlsLabel);
    controlsRow.appendChild(controlsText);
    settingsRows.push(controlsRow);

    settingsTable.append(...settingsRows);

    document.body.appendChild(settingsTable);
    this.addSettingsEventListeners();
  }

  addSettingsEventListeners() {
    const muteButton = document.querySelector('.mute-button');
    Object.assign(muteButton.style, {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
      background: '-webkit-linear-gradient(white, #dfc436)',
      webkitTextFillColor: 'transparent',
      webkitBackgroundClip: 'text',
    });
    muteButton.onclick = () => {
      const isMuted = muteButton.src.includes('mute.png');
      muteButton.src = isMuted ? './assets/UI/unmute.png' : './assets/UI/mute.png';
      setVolume(isMuted ? '0' : '1');
    };
  }

  addBackButton() {
    const backButton = document.createElement('button');
    Object.assign(backButton.style, {
      zIndex: 4,
      position: 'fixed',
      top: '1%',
      left: '1%',
      fontSize: '30px',
      backgroundColor: 'transparent',
      background: '-webkit-linear-gradient(white, #dfc436)',
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
      border: 'none',
      cursor: 'pointer',
    });
    backButton.textContent = 'Back';
    backButton.className = 'backButton';
    backButton.title = 'Back to the main menu';
    backButton.onclick = () => {
      this.transitionEffect.start(() => {
        window.location.reload();
      });
    };
    document.body.appendChild(backButton);
  }

  loadButterflyScript() {
    const butterflyScript = document.createElement('script');
    butterflyScript.setAttribute('type', 'text/javascript');
    butterflyScript.setAttribute('src', './js/effects/butterfly.js');
    document.body.appendChild(butterflyScript);
  }

  initializeTransitionEffect() {
    this.transitionEffect = new TransitionEffect();
  }
  loadTransitionScript() {
    if (typeof TransitionEffect === 'undefined') {
      const transitionScript = document.createElement('script');
      transitionScript.setAttribute('type', 'text/javascript');
      transitionScript.setAttribute('src', './js/effects/transition.js');
      transitionScript.onload = () => {
        this.initializeTransitionEffect();
      };
      document.body.appendChild(transitionScript);
    } else {
      this.initializeTransitionEffect();
    }
  }
}
