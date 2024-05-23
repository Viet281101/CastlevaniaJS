
//////*  Create menu buttons after remove intro element  *//////
document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('introAnimationEnded', function() {
		createMenuButtons();
		createFullscreenButton();
	});
});

//////* Start Sound Script  *//////
function loadSoundScript(src) {
	return new Promise(function(resolve, reject) {
		var soundScript = document.createElement("script");
		soundScript.setAttribute("type", "text/javascript");
		soundScript.setAttribute("src", src);
		soundScript.onload = () => resolve(soundScript);
		soundScript.onerror = () => reject(new Error(`Script load error for ${src}.`));
		document.head.appendChild(soundScript);
	});
};
async function loadSoundAttachButtons() {
	try {
		await loadSoundScript("./js/sound/sound.js");
		attachMenuButtonEvents();
	} catch (e) {
		console.log(e);
	}
};

//////*  Create menu buttons   *//////
function createMenuButtons() {
	buttonApearKeyFrames();
	var buttonContainer = document.createElement('div');
	Object.assign(buttonContainer.style, {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		textAlign: 'center',
		zIndex: 3
	});
	var buttons = ['Start','Demo', 'Credit', 'Setting', 'Quit'];
	buttons.forEach(function(buttonText) {
		var button = document.createElement('button');
		button.className = 'menuButton';
		button.id = buttonText.toLowerCase() + 'Button';
		button.textContent = buttonText;
		button.style.animation = 'buttonApear 2s ease-out forwards';
		buttonContainer.appendChild(button);
	});
	document.body.appendChild(buttonContainer);
	loadSoundAttachButtons();
};
function buttonApearKeyFrames() {
	var styleSheet = document.createElement("style");
	styleSheet.setAttribute("type", "text/css");
	styleSheet.innerText = `@keyframes buttonApear { 0% {opacity: 0;} 100% {opacity: 1;} }`;
	document.head.appendChild(styleSheet);
};

//////* ----------  Attach menu button events ----------- *//////
function attachMenuButtonEvents() {
	const transitionEffect = new TransitionEffect();
	//////*  Start button   *//////
	document.getElementById('startButton').addEventListener('click', function () {
		silentAudio.play().catch(function(error) {
			console.log('Autoplay prevented for silent audio. Initiating playback on user action.');
		});
		transitionEffect.start("game.html?01");
		clickSound.play();
		stopMusic(mainMenuMusic);
	});

	//////*  Demo button   *//////
	document.getElementById('demoButton').addEventListener('click', function () {
		clickSound.play();
		stopMusic(mainMenuMusic);
		transitionEffect.start("./Demo.webm");
	});

	//////*  Credits button   *//////
	document.getElementById('creditButton').addEventListener('click', function () {
		clickSound.play();
		stopMusic(mainMenuMusic);
		let menuCreditScript = document.createElement("script");
		menuCreditScript.setAttribute("type", "text/javascript");
		menuCreditScript.setAttribute("src", "./js/menu/menu_credits.js");
		document.body.appendChild(menuCreditScript);
		transitionEffect.start(function() {
			let creditMenu = new CreditMenu();
			creditMenu.show();
		});
	});

	//////*  Settings button   *//////
	document.getElementById('settingButton').addEventListener('click', function () {
		clickSound.play();
		let menuSettingScript = document.createElement("script");
		menuSettingScript.setAttribute("type", "text/javascript");
		menuSettingScript.setAttribute("src", "./js/menu/menu_settings.js");
		document.body.appendChild(menuSettingScript);
		transitionEffect.start(function() {
			let settingMenu = new SettingsMenu();
			settingMenu.show();
		});
	});

	//////*  Quit button   *//////
	document.getElementById('quitButton').addEventListener('click', function () {
		clickSound.play();
		stopMusic(mainMenuMusic);
		if (confirm("Are you sure you want to quit?")) {
			transitionEffect.start(function() {
				try {
					window.close();
				} catch (e) {
					alert("You can't close this window! Please close the browser tab instead.");
				}
			});
		}
	});

	//////*  Hover effect   *//////
	const menuButtons = document.querySelectorAll(".menuButton");
	let originColor = true;
	menuButtons.forEach(function (button) {
		let originalStyle = Object.assign({}, button.style);
		let hoverStyle = {
			fontSize: (parseInt(window.getComputedStyle(button).fontSize) + (parseInt(window.getComputedStyle(button).fontSize) * 0.05)) + "px",
			textShadow: "0 0 10px #f6f2ff",
			color: "rgb(0, 0, 0)"
		};
		button.addEventListener("mouseover", function () {
			Object.assign(button.style, hoverStyle);
			hoverSound.play();
		});
		button.addEventListener("mouseout", function () {
			Object.assign(button.style, originalStyle);
		});
		document.addEventListener("mousedown", function () {
			Object.assign(button.style, {color: "rgb(0, 0, 0)"});
			originColor = false;
		});
		document.addEventListener("mouseup", function () {
			Object.assign(button.style, {color: "rgb(192, 98, 40)"});
			originColor = true;
		});
	});
};

//////*  FullScreen button   *//////
function createFullscreenButton() {
	var fullscreenContainer = document.createElement('button');
	fullscreenContainer.id = 'fullscreenContainer';
	var fullscreenImage = document.createElement('img');
	Object.assign(fullscreenImage.style, {
		width: 'auto',
		height: '50px'
	});
	// fullscreenImage.src = './assets/UI/zoom_out.png';
	fullscreenImage.src = './assets/UI/fullscreen.png';
	fullscreenImage.alt = 'fullscreen';
	fullscreenImage.setAttribute('title', 'Fullscreen');
	fullscreenContainer.appendChild(fullscreenImage);
	fullscreenContainer.addEventListener('click', function () {
		clickSound.play();
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
			// fullscreenImage.src = './assets/UI/zoom_in.png';
		}
	});
	document.body.appendChild(fullscreenContainer);
};

