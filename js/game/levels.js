
let part = String(window.location).split("?")[1];

let parts = {
	"01":[
		"./js/game/lvl1/controller-01.js", 
		"./js/game/lvl1/display-01.js", 
		"./js/game/baselevel/engine.js", 
		"./js/game/lvl1/game-01.js", 
		"./js/game/lvl1/main-01.js"
	],
	"02":[
		"./js/game/lvl2/controller-02.js", 
		"./js/game/lvl2/display-02.js", 
		"./js/game/baselevel/engine.js", 
		"./js/game/lvl2/game-02.js", 
		"./js/game/lvl2/main-02.js"
	],
};

switch(part) {
	case "01": case "02": break;
	default:
		part = "01";
};

function loadScripts() {
	for (let index = 0; index < parts[part].length; index ++) {
		let script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", parts[part][index]);
		document.head.appendChild(script);
	};
	let transitionEffectScript = document.createElement("script");
	transitionEffectScript.setAttribute("type", "text/javascript");
	transitionEffectScript.setAttribute("src", "./js/effects/transition.js");
	document.head.appendChild(transitionEffectScript);

	let soundScript = document.createElement("script");
	soundScript.setAttribute("type", "text/javascript");
	soundScript.setAttribute("src", "./js/sound/sound.js");
	document.head.appendChild(soundScript);
	
	let musicsScript = document.createElement("script");
	musicsScript.setAttribute("type", "text/javascript");
	musicsScript.setAttribute("src", "./js/sound/music.js");
	document.head.appendChild(musicsScript);

	fadeInEffect();
	defineFadeInKeyframes();

	console.log("Loaded part " + part + " of the game.");
};
function fadeInEffect() {
	var fadeInDiv = document.createElement('div');
    fadeInDiv.className = 'fade-in';
    fadeInDiv.style.background = 'rgb(0, 0, 0, 1)';
    fadeInDiv.style.zIndex = 9;
    fadeInDiv.style.position = 'fixed';
    fadeInDiv.style.top = '0';
    fadeInDiv.style.left = '0';
    fadeInDiv.style.width = '100%';
    fadeInDiv.style.height = '100%';
    fadeInDiv.style.animation = 'fadeIn 12s forwards';
    document.body.appendChild(fadeInDiv);

	fadeInDiv.addEventListener('animationend', function() {
        fadeInDiv.remove();
        document.dispatchEvent(new CustomEvent('fadeInEnded'));
    });
};
function defineFadeInKeyframes() {
    var styleSheet = document.createElement("style");
    styleSheet.setAttribute("type", "text/css");
    styleSheet.innerText = `@keyframes fadeIn { 0% {background: rgb(0, 0, 0, 1);} 100% {background: rgb(0, 0, 0, 0);} }`;
    document.head.appendChild(styleSheet);
};

loadScripts();
