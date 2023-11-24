
///// Scroll text on credits page /////

class CreditMenu {
    constructor() {
        this.transitionEffect = null;
    }

    show() {
        document.body.innerHTML = '';
        this.loadTransitionScript();
        this.addBackButton();
    }

    addBackButton() {
        let backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.className = "backButton";
        backButton.style.position = 'fixed';
        backButton.style.top = '0%';
        backButton.style.left = '0%';
        backButton.style.fontSize = '30px';
        backButton.style.backgroundColor = 'transparent';
        backButton.style.border = 'none';
        backButton.style.cursor = 'pointer';
        backButton.onclick = () => {
            this.transitionEffect.start(()=>{window.location.reload()});
        };
        document.body.appendChild(backButton);
    }

    loadTransitionScript() {
        let transitionScript = document.createElement("script");
        transitionScript.setAttribute("type", "text/javascript");
        transitionScript.setAttribute("src", "./js/effects/transition.js");
        transitionScript.onload = () => {
            this.transitionEffect = new TransitionEffect();
        };
        document.body.appendChild(transitionScript);
    }
}

