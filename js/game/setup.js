class Setup {
  constructor() {
    const j = './js/';
    this.jg = j + 'game/';
    this.parts = {
      '00': [
        this.jg + 'controller.js',
        this.jg + 'display.js',
        this.jg + 'engine.js',
        this.jg + 'game_core.js',
        this.jg + 'game_entities.js',
        this.jg + 'game_world.js',
        this.jg + 'game_tileset.js',
        this.jg + 'main.js',
        this.jg + 'stats.js',
      ],
    };
    this.part = String(window.location).split('?')[1];
    if (!this.parts.hasOwnProperty(this.part)) {
      this.part = '00';
    }
  }

  loadScripts() {
    const scriptsToLoad = [
      ...this.parts[this.part],
      './js/effects/transition.js',
      './js/sound/sound.js',
      './js/sound/music.js',
      './js/menu/pause.js',
    ];

    const loadNext = (index) => {
      if (index >= scriptsToLoad.length) {
        this.fadeInEffect();
        this.defineFadeInKeyframes();
        console.log('Loaded part ' + this.part + ' of the game.');
        return;
      }

      const src = scriptsToLoad[index];
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.onload = () => loadNext(index + 1);
      script.onerror = () => {
        console.error(`Failed to load script: ${src}`);
        alert('Failed to load some resources. The page will reload.');
        window.location.reload();
      };
      document.head.appendChild(script);
    };

    loadNext(0);
  }

  fadeInEffect() {
    const fadeInDiv = document.createElement('div');
    fadeInDiv.className = 'fade-in';
    Object.assign(fadeInDiv.style, {
      background: 'rgb(0, 0, 0, 1)',
      zIndex: 9,
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      animation: 'fadeIn 12s forwards',
    });
    document.body.appendChild(fadeInDiv);

    fadeInDiv.addEventListener('animationend', () => {
      fadeInDiv.remove();
      document.dispatchEvent(new CustomEvent('fadeInEnded'));
    });
  }

  defineFadeInKeyframes() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `@keyframes fadeIn { 0% {background: rgb(0, 0, 0, 1);} 100% {background: rgb(0, 0, 0, 0);} }`;
    document.head.appendChild(styleSheet);
  }
}

const levelSetup = new Setup();
levelSetup.loadScripts();
