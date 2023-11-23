
//////*  Sounds   *//////
var silentAudio = new Audio("data:audio/mp3;base64,//MkxAA........");
var hoverSound = new Audio("https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/btn_hover.wav?raw=true");
var clickSound = new Audio("https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/btn_click.wav?raw=true");

//////*  Remove intro element and create menu buttons  *//////
document.addEventListener('DOMContentLoaded', function() {
	var introElement = document.querySelector('.intro-background');
	if (introElement) {
		introElement.addEventListener('animationend', function() {
			removeIntroElement();
			createMenuButtons();
			createFullscreenButton();
		});
	}
});
function removeIntroElement() {
	var introElement = document.querySelector('.intro-background');
	var fadeInEffect = document.querySelector('.fade-in');
	if (introElement) {
		introElement.parentNode.removeChild(introElement);
		// Or introElement.style.display = 'none';
	}
	if (fadeInEffect) {
		fadeInEffect.parentNode.removeChild(fadeInEffect);
		// Or fadeInEffect.style.display = 'none';
	}
};

//////*  Create menu buttons   *//////
function createMenuButtons() {
    var buttonContainer = document.createElement('div');
	buttonContainer.style.position = 'fixed';
	buttonContainer.style.top = '50%';
	buttonContainer.style.left = '50%';
	buttonContainer.style.transform = 'translate(-50%, -50%)';
	buttonContainer.style.textAlign = 'center';
	buttonContainer.style.zIndex = 3;
	var buttons = ['Start', 'Credit', 'Setting', 'Quit'];
	buttons.forEach(function(buttonText) {
		var button = document.createElement('button');
		button.className = 'menuButton';
		button.id = buttonText.toLowerCase() + 'Button';
		button.textContent = buttonText;
		buttonContainer.appendChild(button);
	});
	document.body.appendChild(buttonContainer);
	attachMenuButtonEvents();
};

//////* ----------  Attach menu button events ----------- *//////
function attachMenuButtonEvents() {
	//////*  Start button   *//////
	document.getElementById('startButton').addEventListener('click', function () {
		silentAudio.play().catch(function(error) {
			console.log('Autoplay prevented for silent audio. Initiating playback on user action.');
		});
		startTransition("game.html?01");
		clickSound.play();
	});

	//////*  Settings button   *//////
	document.getElementById('settingButton').addEventListener('click', function () {
		clickSound.play();

	});

	//////*  Credits button   *//////
	document.getElementById('creditButton').addEventListener('click', function () {
		clickSound.play();
		let menuCreditScript = document.createElement("script");
		menuCreditScript.setAttribute("type", "text/javascript");
		menuCreditScript.setAttribute("src", "./js/menu/menu_credits.js");
		document.body.appendChild(menuCreditScript);
		startTransition(function() {
			let creditMenu = new CreditMenu();
			creditMenu.show();
		});
	});

	//////*  Quit button   *//////
	document.getElementById('quitButton').addEventListener('click', function () {
		clickSound.play();
		if (confirm("Are you sure you want to quit?")) {
			startTransition(function() {
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
        let textSize = parseInt(window.getComputedStyle(button).fontSize);
        let textSizeHover = textSize + (textSize * 0.05);
        button.setAttribute('title', button.textContent);
        button.addEventListener("mouseover", function () {
            button.style.fontSize = textSizeHover + "px";
            button.style.textShadow = "0 0 10px #f6f2ff";
			button.style.color = "rgb(0, 0, 0)";
            hoverSound.play();
        });
        button.addEventListener("mouseout", function () {
            button.style.fontSize = textSize + "px";
            button.style.textShadow = "none";
			if (originColor) button.style.color = "rgb(192, 98, 40)";
        });
		document.addEventListener("mousedown", function () {
			button.style.color = "rgb(0, 0, 0)";
			originColor = false;
		});
		document.addEventListener("mouseup", function () {
			button.style.color = "rgb(192, 98, 40)";
			originColor = true;
		});
    });
};

//////*  FullScreen button   *//////
function createFullscreenButton() {
	var fullscreenContainer = document.createElement('button');
	fullscreenContainer.id = 'fullscreenContainer';
	var fullscreenImage = document.createElement('img');
	fullscreenImage.style.width = 'auto';
	fullscreenImage.style.height = '50px';
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

