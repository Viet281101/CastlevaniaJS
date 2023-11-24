
////// For the settings page //////
////// Settings sounds, musics, languages, light and key controls, etc. //////

class SettingsMenu {
    constructor() {
        if (typeof this.transitionEffect !== 'undefined') {
            this.transitionEffect = new TransitionEffect();
        }
    }

    show() {
        document.body.innerHTML = '';
        document.body.style.backgroundColor = 'black';
        this.loadTransitionScript();
        this.addBackButton();
        this.settingsMenuContent();
    }

    settingsMenuContent() {
        let settingsContainer = document.createElement('div');
        settingsContainer.innerHTML = `<h1>Settings</h1>`;
        settingsContainer.style.position = 'fixed';
        settingsContainer.style.top = '20%';
        settingsContainer.style.left = '50%';
        settingsContainer.style.transform = 'translate(-50%, -50%)';
        settingsContainer.style.textAlign = 'center';
        settingsContainer.style.fontSize = '40px';
        settingsContainer.style.background = "-webkit-linear-gradient(white, #dfc436)";
        settingsContainer.style.webkitTextFillColor = 'transparent';
        settingsContainer.style.webkitBackgroundClip = 'text';
        document.body.appendChild(settingsContainer);
    }

    addBackButton() {
        let backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.className = "backButton";
        backButton.title = "Back to the main menu";
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
            this.transitionEffect.start(()=>{window.location.reload()});
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
