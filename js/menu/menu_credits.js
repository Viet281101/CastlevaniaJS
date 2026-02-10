///// Scroll text on credits page /////

class CreditMenu {
  constructor() {
    if (typeof this.transitionEffect !== 'undefined') {
      this.transitionEffect = new TransitionEffect();
    }
  }

  show() {
    let existingCanvas = document.getElementById('canvas');
    if (existingCanvas) {
      // existingCanvas.style.display = 'none';
      existingCanvas.remove();
    }
    document.body.innerHTML = '';
    document.body.style.backgroundColor = 'black';
    this.loadTransitionScript();
    this.addBackButton();
    this.creditContent();

    //// Butterfly ////
    let newCanvas = document.createElement('canvas');
    newCanvas.id = 'butterflyCanvas';
    newCanvas.style.position = 'absolute';
    newCanvas.style.zIndex = '1';
    document.body.appendChild(newCanvas);
    this.loadButterflyScript();
  }

  creditContent() {
    let creditContainer = document.createElement('div');
    creditContainer.id = 'creditContainer';
    Object.assign(creditContainer.style, {
      position: 'fixed',
      zIndex: 2,
      left: '50%',
      top: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
      overflow: 'hidden',
    });

    let creditText = [
      'Credits',
      ' ',
      'Game Design',
      ' ',
      'Game Programming',
      ' ',
      'Art',
      ' ',
      'Music',
      ' ',
      'Sound Effects',
      ' ',
      'Special Thanks',
      ' ',
    ];
    creditText.forEach(function (text) {
      let credit = document.createElement('div');
      credit.className = 'credit';
      credit.textContent = text;
      Object.assign(credit.style, {
        fontSize: '30px',
        background: '-webkit-linear-gradient(#ffffcc, #ecc400)',
        webkitTextFillColor: 'transparent',
        webkitBackgroundClip: 'text',
      });
      creditContainer.appendChild(credit);
    });
    document.body.appendChild(creditContainer);
    // this.scrollCredits();
  }

  scrollCredits() {
    let creditContainer = document.getElementById('creditContainer');
    let creditHeight = creditContainer.offsetHeight;
    let currentTop = parseInt(window.getComputedStyle(creditContainer).top);

    function scroll() {
      currentTop -= 1;
      creditContainer.style.top = currentTop + 'px';

      if (Math.abs(currentTop) > creditHeight) {
        currentTop = window.innerHeight;
      }

      setTimeout(scroll, 20);
    }
    scroll();
  }

  loadButterflyScript() {
    let butterflyScript = document.createElement('script');
    butterflyScript.setAttribute('type', 'text/javascript');
    butterflyScript.setAttribute('src', './js/effects/butterfly.js');
    document.body.appendChild(butterflyScript);
  }

  addBackButton() {
    let backButton = document.createElement('button');
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
    backButton.title = 'Back to the main menu';
    backButton.className = 'backButton';
    backButton.onclick = () => {
      this.transitionEffect.start(() => {
        window.location.reload();
      });
    };
    document.body.appendChild(backButton);
  }

  initializeTransitionEffect() {
    this.transitionEffect = new TransitionEffect();
  }
  loadTransitionScript() {
    if (typeof TransitionEffect === 'undefined') {
      let transitionScript = document.createElement('script');
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
