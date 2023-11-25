
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

	console.log("Loaded part " + part + " of the game.");
};

loadScripts();
