
window.addEventListener("load", function(event) {

	"use strict";

	//// CONSTANTS ////

	const ZONE_PREFIX = "js/game/lvl1/zone";
	const ZONE_SUFFIX = ".json";

	/////////////////
	//// CLASSES ////
	/////////////////
	const AssetsManager = function() {
		this.tile_set_image = undefined;
		this.player_image = undefined;
		this.heal_health_image = undefined;
	};

	AssetsManager.prototype = {

		constructor: Game.AssetsManager,

		/* Requests a file and hands the callback function the contents of that file
		parsed by JSON.parse. */
		requestJSON:function(url, callback) {
	
			let request = new XMLHttpRequest();

			request.addEventListener("load", function(event) {
				callback(JSON.parse(this.responseText));
			}, { once:true });

			request.open("GET", url);
			request.send();

		},

		/* Creates a new Image and sets its src attribute to the specified url. When
		the image loads, the callback function is called. */
		requestImage:function(url, callback) {

			let image = new Image();

			image.addEventListener("load", function(event) {
				callback(image);
			}, { once:true });

			image.src = url;

		},

	};

	///////////////////
	//// FUNCTIONS ////
	///////////////////

	var keyDownUp = function(event) {
		controller.keyDownUp(event.type, event.keyCode);
	};

	var resize = function(event) {
		display.resize(
			document.documentElement.clientWidth - 16, 
			document.documentElement.clientHeight - 16, 
			game.world.height / game.world.width
		);
		display.render();

		var rectangle = display.context.canvas.getBoundingClientRect();
		p.style.left = rectangle.left + "px";
		p.style.top  = rectangle.top  + "px";
		p.style.fontSize = game.world.tile_set.tile_size * rectangle.height / game.world.height + "px";
	};

	var render = function() {

		var frame = undefined;

		display.drawMap(
			assets_manager.tile_set_image,
			game.world.tile_set.columns,
			game.world.graphical_map,
			game.world.columns,
			game.world.tile_set.tile_size
		);

		for (let index = game.world.heal_health.length - 1; index > -1; -- index) {
			let heal_health = game.world.heal_health[index];
			frame = game.world.tile_set.frames[heal_health.frame_value];

			display.drawObject(
				assets_manager.heal_health_image,
				frame.x, frame.y,
				heal_health.x + Math.floor(heal_health.width * 0.5 - frame.width * 0.5) + frame.offset_x,
				heal_health.y + frame.offset_y, 
				frame.width, frame.height
			);
		}
		p.innerHTML = "HEALTH: " + game.world.health;

		frame = game.world.tile_set.frames[game.world.player.frame_value];

		display.drawObject(
			assets_manager.player_image,
			frame.x, frame.y,
			game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
			game.world.player.y + frame.offset_y, 
			frame.width, frame.height
		);

		// display.drawCollisionMap(game.world.collision_map, game.world.columns, game.world.tile_set.tile_size);
		display.render();

	};

	var update = function() {
		if (!game.paused) {
			if (controller.left.active) { game.world.player.moveLeft(); }
			if (controller.right.active) { game.world.player.moveRight(); }
			if (controller.squat.active) { game.world.player.squat(); }
			if (controller.attack.active) { game.world.player.attack(); }
			if (controller.up.active) {
				game.world.player.jump();
				controller.up.active = false;
			}

			game.update();

			if (game.world.door) {
				engine.stop();
				assets_manager.requestJSON(ZONE_PREFIX + game.world.door.destination_zone + ZONE_SUFFIX, (zone) => {
					game.world.setup(zone);
					engine.start();
				});
				return;
			}
		} else {
			console.log("Le jeu est en pause");
			pauseMenu.show();
		}
	};


	/////////////////
	//// OBJECTS ////
	/////////////////

	var assets_manager = new AssetsManager();
	var controller     = new Controller();
	var display        = new Display(document.querySelector("canvas"));
	var game           = new Game();
	var engine         = new Engine(1000/40, render, update);
	var pauseMenu = initPauseMenu();

	var p = document.createElement("p");
	p.setAttribute("style", "color: red; position: fixed;");
	p.innerHTML = "HEALTH: 0";
	document.body.appendChild(p);

	////////////////////
	//// INITIALIZE ////
	////////////////////

	display.buffer.canvas.height = game.world.height;
	display.buffer.canvas.width  = game.world.width;
	display.buffer.imageSmoothingEnabled = false;

	assets_manager.requestJSON(ZONE_PREFIX + game.world.zone_id + ZONE_SUFFIX, (zone) => {

		game.world.setup(zone);

		assets_manager.requestImage("assets/Tiles/tiles_spritesheet.png", (image) => {
			assets_manager.tile_set_image = image;
			resize();
			engine.start();
		});

		assets_manager.requestImage("assets/Characters/Alucard(Hero)/alucard.png", (image) => {
			assets_manager.player_image = image;
		});

		assets_manager.requestImage("assets/UI/heart_life.png", (image) => {
			assets_manager.heal_health_image = image;
		});
	});
	window.addEventListener('keydown', function(event) {
		console.log("Touche enfoncée :", event.key);
		if (event.key === 'p' || event.key === 'P') {
			if (game.paused) {
				game.resume();
				pauseMenu.hide();
			} else {
				game.pause();
				pauseMenu.show();
			}
		}
	});
	window.addEventListener("keydown", keyDownUp);
	window.addEventListener("keyup"  , keyDownUp);
	window.addEventListener("resize" , resize);

});
