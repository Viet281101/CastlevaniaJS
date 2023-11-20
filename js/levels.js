
let part = String(window.location).split("?")[1];

let parts = {
	"01":[
		"./js/lvl_1/controller-01.js", 
		"./js/lvl_1/display-01.js", 
		"./js/base/engine.js", 
		"./js/lvl_1/game-01.js", 
		"./js/lvl_1/main-01.js"
	],
	"02":[
		"./js/lvl_2/controller-02.js", 
		"./js/lvl_2/display-02.js", 
		"./js/base/engine.js", 
		"./js/lvl_2/game-02.js", 
		"./js/lvl_2/main-02.js"
	],
	"03":[
		"./js/lvl_2/controller-02.js", 
		"./js/lvl_3/display-03.js", 
		"./js/base/engine.js", 
		"./js/lvl_3/game-03.js", 
		"./js/lvl_3/main-03.js"
	],
};

switch(part) {
	case "01": case "02": case "03": break;
	default:
		part = "01";
};


for (let index = 0; index < parts[part].length; index ++) {
	let script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("src", parts[part][index]);
	document.head.appendChild(script);
};

console.log("Loaded part " + part + " of the game.");
