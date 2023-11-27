
////// For the settings page //////
////// Settings sounds, musics, languages, light and key controls, etc. //////

class SettingsMenu {
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
        this.settingsMenuContent();
        this.settingsParameters();
        //// Butterfly ////
        let newCanvas = document.createElement('canvas');
        newCanvas.id = 'butterflyCanvas';
        document.body.appendChild(newCanvas);
        this.loadButterflyScript();
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
        settingsContainer.style.background = "-webkit-linear-gradient(#ffffcc, #ecc400)";
        settingsContainer.style.webkitTextFillColor = 'transparent';
        settingsContainer.style.webkitBackgroundClip = 'text';
        document.body.appendChild(settingsContainer);
	}

    settingsParameters() {
        let settingsTable = document.createElement('table');
		settingsTable.zIndex = 5;
		settingsTable.style.position = 'fixed';
        settingsTable.style.top = '50%';
        settingsTable.style.left = '50%';
		settingsTable.style.width = '30%';
		settingsTable.style.transform = 'translate(-50%, -50%)';
		settingsTable.style.textAlign = 'center';
		settingsTable.style.fontSize = '25px';
		settingsTable.style.background = "-webkit-linear-gradient(#ffffcc, #ecc400)";
		settingsTable.style.webkitTextFillColor = 'transparent';
		settingsTable.style.webkitBackgroundClip = 'text';
		settingsTable.innerHTML = `
			<tr>
				<td>Volume:</td>
				<td><input type="range" min="0" max="100" value="50"></td>
			</tr>
			<tr>
				<td>Sound:</td>
				<td><img src="./assets/UI/unmute.png" class="mute-button" style="width: 30px; height: 30px;"></td>
			</tr>
			<tr>
				<td>Fullscreen:</td>
				<td><input type="checkbox" class="fullscreen-checkbox"></td>
			</tr>
			<tr>
				<td>Theme:</td>
				<td>
					<select class="theme-select">
						<option value="default">Default</option>
						<option value="dark">Dark</option>
						<option value="light">Light</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>Language:</td>
				<td>
					<select class="lang-select">
						<option value="english">English</option>
						<option value="francais">Français</option>
					</select>
                </td>
			</tr>
			<tr>
				<td>Controls:</td>
				<td> ... </td>
			</tr>
		`;

		document.body.appendChild(settingsTable);
		this.addSettingsEventListeners();
    }

	addSettingsEventListeners() {
		let muteButton = document.querySelector('.mute-button');
		muteButton.style.cursor = 'pointer';
		muteButton.style.border = 'none';
		muteButton.style.backgroundColor = 'transparent';
		muteButton.style.background = "-webkit-linear-gradient(white, #dfc436)";
		muteButton.style.webkitTextFillColor = 'transparent';
		muteButton.style.webkitBackgroundClip = 'text';
		muteButton.onclick = () => {
			let isMuted = muteButton.src.includes('mute.png');
			muteButton.src = isMuted ? './assets/UI/unmute.png' : './assets/UI/mute.png';
			setVolume(isMuted ? '0' : '1');
		};
	}

    addBackButton() {
        let backButton = document.createElement('button');
        backButton.textContent = 'Back';
        backButton.className = "backButton";
        backButton.title = "Back to the main menu";
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
        backButton.onclick = () => { this.transitionEffect.start(()=>{ window.location.reload()}); };
        document.body.appendChild(backButton);
    }

    loadButterflyScript() {
        let butterflyScript = document.createElement("script");
        butterflyScript.setAttribute("type", "text/javascript");
        butterflyScript.setAttribute("src", "./js/effects/butterfly.js");
        document.body.appendChild(butterflyScript);
    }

    initializeTransitionEffect() { this.transitionEffect = new TransitionEffect(); }
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
};
