
////// For the settings page //////
////// Settings sounds, musics, languages, light and key controls, etc. //////

class SettingsMenu {
	constructor() {
		if (typeof this.transitionEffect !== 'undefined') {
			this.transitionEffect = new TransitionEffect();
		}
	};

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
		newCanvas.style.position = 'absolute'; 
		newCanvas.style.zIndex = '1';
		document.body.appendChild(newCanvas);
		this.loadButterflyScript();
	};

	settingsMenuContent() {
		let settingsContainer = document.createElement('div');
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
	};

	settingsParameters() {
		let settingsTable = document.createElement('table');
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
		let settingsRows = [];

		let volumeRow = document.createElement('tr');
		let volumeLabel = document.createElement('td');
		volumeLabel.textContent = 'Volume:';
		let volumeInput = document.createElement('input');
		volumeInput.type = 'range';
		volumeInput.min = '0';
		volumeInput.max = '100';
		volumeInput.value = '50';
		volumeRow.appendChild(volumeLabel);
		volumeRow.appendChild(volumeInput);
		settingsRows.push(volumeRow);

		let soundRow = document.createElement('tr');
		let soundLabel = document.createElement('td');
		soundLabel.textContent = 'Sound:';
		let soundButton = document.createElement('img');
		soundButton.src = './assets/UI/unmute.png';
		soundButton.className = 'mute-button';
		soundButton.style.width = '30px';
		soundButton.style.height = '30px';
		soundRow.appendChild(soundLabel);
		soundRow.appendChild(soundButton);
		settingsRows.push(soundRow);

		let fullscreenRow = document.createElement('tr');
		let fullscreenLabel = document.createElement('td');
		fullscreenLabel.textContent = 'Fullscreen:';
		let fullscreenInput = document.createElement('input');
		fullscreenInput.type = 'checkbox';
		fullscreenInput.className = 'fullscreen-checkbox';
		fullscreenRow.appendChild(fullscreenLabel);
		fullscreenRow.appendChild(fullscreenInput);
		settingsRows.push(fullscreenRow);

		let themeRow = document.createElement('tr');
		let themeLabel = document.createElement('td');
		themeLabel.textContent = 'Theme:';
		let themeSelect = document.createElement('select');
		let defaultOption = document.createElement('option');
		defaultOption.value = 'default';
		defaultOption.textContent = 'Default';
		themeSelect.appendChild(defaultOption);
		let darkOption = document.createElement('option');
		darkOption.value = 'dark';
		darkOption.textContent = 'Dark';
		themeSelect.appendChild(darkOption);
		let lightOption = document.createElement('option');
		lightOption.value = 'light';
		lightOption.textContent = 'Light';
		themeSelect.appendChild(lightOption);
		themeRow.appendChild(themeLabel);
		themeRow.appendChild(themeSelect);
		settingsRows.push(themeRow);

		let langRow = document.createElement('tr');
		let langLabel = document.createElement('td');
		langLabel.textContent = 'Language:';
		let langSelect = document.createElement('select');
		let englishOption = document.createElement('option');
		englishOption.value = 'english';
		englishOption.textContent = 'English';
		langSelect.appendChild(englishOption);
		let francaisOption = document.createElement('option');
		francaisOption.value = 'francais';
		francaisOption.textContent = 'Français';
		langSelect.appendChild(francaisOption);
		langRow.appendChild(langLabel);
		langRow.appendChild(langSelect);
		settingsRows.push(langRow);

		let controlsRow = document.createElement('tr');
		let controlsLabel = document.createElement('td');
		controlsLabel.textContent = 'Controls:';
		let controlsText = document.createElement('div');
		controlsText.textContent = '&uarr;: Sauter\n&darr;: Accroupie\n&larr;: Gauche\n&rarr;: Droite\nEspace: Attaquer\nP : Pause';
		controlsRow.appendChild(controlsLabel);
		controlsRow.appendChild(controlsText);
		settingsRows.push(controlsRow);

		settingsTable.append(...settingsRows);

		document.body.appendChild(settingsTable);
		this.addSettingsEventListeners();
	};

	addSettingsEventListeners() {
		let muteButton = document.querySelector('.mute-button');
		Object.assign(muteButton.style, {
			cursor: 'pointer',
			border: 'none',
			backgroundColor: 'transparent',
			background: '-webkit-linear-gradient(white, #dfc436)',
			webkitTextFillColor: 'transparent',
			webkitBackgroundClip: 'text',
		});
		muteButton.onclick = () => {
			let isMuted = muteButton.src.includes('mute.png');
			muteButton.src = isMuted ? './assets/UI/unmute.png' : './assets/UI/mute.png';
			setVolume(isMuted ? '0' : '1');
		};
	};

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
		backButton.className = "backButton";
		backButton.title = "Back to the main menu";
		backButton.onclick = () => { this.transitionEffect.start(()=>{ window.location.reload()}); };
		document.body.appendChild(backButton);
	};

	loadButterflyScript() {
		let butterflyScript = document.createElement("script");
		butterflyScript.setAttribute("type", "text/javascript");
		butterflyScript.setAttribute("src", "./js/effects/butterfly.js");
		document.body.appendChild(butterflyScript);
	};

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
	};
};
