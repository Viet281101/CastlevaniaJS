
////// For the settings page //////
////// Settings sounds, musics, languages, light and key controls, etc. //////

class SettingsMenu {
    constructor() {
        this.transitionEffect = null;
    }

    show() {
        document.body.innerHTML = '';
        document.body.style.backgroundColor = 'black';
        this.loadTransitionScript();
        this.addBackButton();
    }

    addBackButton() {
        let backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.className = "backButton";
        backButton.style.position = 'fixed';
        backButton.style.top = '1%';
        backButton.style.left = '1%';
        backButton.style.fontSize = '30px';
        backButton.style.backgroundColor = 'transparent';
        backButton.style.color = 'white';
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
};
