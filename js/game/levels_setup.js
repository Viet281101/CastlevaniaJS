////* File: levels_setup.js -> this file is used to load the scripts of the game levels *////
class LevelSetup {
	constructor() {
		const j='./js/';
		this.jg=j+'game/';
		this.jgb=this.jg+'baselevel/';
		this.jg1=this.jg+'lvl1/';
		this.jg2=this.jg+'lvl2/';
		this.parts = {
			"00": [this.jgb+"controller.js", this.jgb+"display.js", this.jgb+"engine.js", this.jgb+"game.js", this.jgb+"main.js"],
			"01": [this.jg1+"controller-01.js", this.jg1+"display-01.js", this.jgb+"engine.js", this.jg1+"game-01.js", this.jg1+"main-01.js"],
			"02": [this.jg2+"controller-02.js", this.jg2+"display-02.js", this.jgb+"engine.js", this.jg2+"game-02.js", this.jg2+"main-02.js"]
		};
		this.part = String(window.location).split("?")[1];
		if (!this.parts.hasOwnProperty(this.part)) { this.part = "01"; }
	};

	loadScripts() {
		const scriptsToLoad = [
			...this.parts[this.part],
			"./js/effects/transition.js",
			this.jg+"stats.js",
			"./js/sound/sound.js",
			"./js/sound/music.js",
			"./js/menu/menu_pause.js",
			"./js/leaflet/leaflet.js",
			this.jg+"mini_map.js"
		];
		scriptsToLoad.forEach(src => {
			let script = document.createElement("script");
			script.type = "text/javascript";
			script.src = src;
			document.head.appendChild(script);
		});
		this.loadLeafletStyle();
		this.fadeInEffect();
		this.defineFadeInKeyframes();
		console.log("Loaded part "+this.part+" of the game.");
	};

	loadLeafletStyle() {
		let leafletStyle = document.createElement("link");
		leafletStyle.rel = "stylesheet";
		leafletStyle.type = "text/css";
		leafletStyle.href = "./js/leaflet/leaflet.css";
		document.head.appendChild(leafletStyle);
	};

	fadeInEffect() {
		var fadeInDiv = document.createElement('div');
		fadeInDiv.className = 'fade-in';
		Object.assign(fadeInDiv.style, {
			background: 'rgb(0, 0, 0, 1)', zIndex: 9,
			position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
			animation: 'fadeIn 12s forwards',
		});
		document.body.appendChild(fadeInDiv);

		fadeInDiv.addEventListener('animationend', () => {
			fadeInDiv.remove();
			document.dispatchEvent(new CustomEvent('fadeInEnded'));
		});
	};

	defineFadeInKeyframes() {
		var styleSheet = document.createElement("style");
		styleSheet.type = "text/css";
		styleSheet.innerText = `@keyframes fadeIn { 0% {background: rgb(0, 0, 0, 1);} 100% {background: rgb(0, 0, 0, 0);} }`;
		document.head.appendChild(styleSheet);
	};
};

const levelSetup = new LevelSetup();
levelSetup.loadScripts();

