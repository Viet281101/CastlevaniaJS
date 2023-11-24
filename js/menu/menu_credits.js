
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
        document.body.appendChild(newCanvas);
        this.loadButterflyScript();
    }

    creditContent() {
        let creditContainer = document.createElement('div');
        creditContainer.style.position = 'fixed';
        creditContainer.style.top = '50%';
        creditContainer.style.left = '50%';
        creditContainer.style.transform = 'translate(-50%, -50%)';
        creditContainer.style.textAlign = 'center';
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
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
            ' ',
        ];
        creditText.forEach(function(text) {
            let credit = document.createElement('div');
            credit.className = 'credit';
            credit.textContent = text;
            credit.style.fontSize = '30px';
            credit.style.background = "-webkit-linear-gradient(white, #dfc436)";
            credit.style.webkitTextFillColor = 'transparent';
            credit.style.webkitBackgroundClip = 'text';
            creditContainer.appendChild(credit);
        });
        document.body.appendChild(creditContainer);
    }

    loadButterflyScript() {
        let butterflyScript = document.createElement("script");
        butterflyScript.setAttribute("type", "text/javascript");
        butterflyScript.setAttribute("src", "./js/effects/butterfly.js");
        document.body.appendChild(butterflyScript);
    }

    addBackButton() {
        let backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.title = "Back to the main menu";
        backButton.className = "backButton";
        backButton.style.zIndex = 4;
        backButton.style.position = 'fixed';
        backButton.style.top = '1%';
        backButton.style.left = '1%';
        backButton.style.fontSize = '30px';
        backButton.style.backgroundColor = 'transparent';
        backButton.style.background = "-webkit-linear-gradient(white, #dfc436)";
        backButton.style.webkitTextFillColor = 'transparent';
        backButton.style.webkitBackgroundClip = 'text';
        backButton.style.border = 'none';
        backButton.style.cursor = 'pointer';
        backButton.onclick = () => {
            this.transitionEffect.start(() => { window.location.reload() });
        };
        document.body.appendChild(backButton);
    }

    loadTransitionScript() {
        if (typeof TransitionEffect === 'undefined') {
            let transitionScript = document.createElement("script");
            transitionScript.setAttribute("type", "text/javascript");
            transitionScript.setAttribute("src", "./js/effects/transition.js");
            transitionScript.onload = () => {
                this.initializeTransitionEffect();
            };
            document.body.appendChild(transitionScript);
        } else {
            this.initializeTransitionEffect();
        }
    }
    initializeTransitionEffect() {
        this.transitionEffect = new TransitionEffect();
    }
};

