window.addEventListener("load", function(event) {
	"use strict";

	const ZONE_PREFIX = "js/game/zone";
	const ZONE_SUFFIX = ".json";

	class AssetsManager {
		constructor() {
			this.tile_set_image = undefined;
			this.player_image = undefined;
			this.heal_health_image = undefined;
			this.torch_image = undefined;
			this.fire_skull_image = undefined;
			this.nightmare_image = undefined;
			this.dark_skull_image = undefined;
			this.ghost_image = undefined;
		};

		requestJSON(url, callback) {
			fetch(url).then(response => response.json()).then(data => callback(data)).catch(error => console.error("Failed to load JSON:", error));
		};

		requestImage(url, callback) {
			let image = new Image();
			image.onload = () => callback(image);
			image.src = url;
		};
	};

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
		p.textContent = "HEALTH: " + game.world.health;

		frame = game.world.tile_set.frames[game.world.player.frame_value];

		display.drawObject(
			assets_manager.player_image,
			frame.x, frame.y,
			game.world.player.x + Math.floor(game.world.player.width * 0.5 - frame.width * 0.5) + frame.offset_x,
			game.world.player.y + frame.offset_y, 
			frame.width, frame.height
		);

		for (let index = game.world.torch.length - 1; index > -1; -- index) {
			let torch = game.world.torch[index];
			frame = game.world.tile_set.frames[torch.frame_value];

			display.drawObject(
				assets_manager.torch_image,
				frame.x, frame.y,
				torch.x + frame.offset_x,
				torch.y + frame.offset_y, 
				frame.width, frame.height
			);
		}

		for (let index = game.world.monster_normale.length - 1; index > -1; -- index) {
			let monster_normale = game.world.monster_normale[index];
			frame = game.world.tile_set.frames[monster_normale.frame_value];
			display.drawObject(
				assets_manager.nightmare_image,
				frame.x, frame.y,
				monster_normale.x + Math.floor(monster_normale.width * 0.5 - frame.width * 0.5) + frame.offset_x,
				monster_normale.y + frame.offset_y, 
				frame.width, frame.height
			);
		}

		for (let index = game.world.monster_contactjump.length - 1; index > -1; -- index) {
			let monster_contactjump = game.world.monster_contactjump[index];
			frame = game.world.tile_set.frames[monster_contactjump.frame_value];
			display.drawObject(
				assets_manager.dark_skull_image,
				frame.x, frame.y,
				monster_contactjump.x + Math.floor(monster_contactjump.width * 0.5 - frame.width * 0.5) + frame.offset_x,
				monster_contactjump.y + frame.offset_y, 
				frame.width, frame.height
			);
		}

		for (let index = game.world.monster_fly.length - 1; index > -1; -- index) {
			let monster_fly = game.world.monster_fly[index];
			frame = game.world.tile_set.frames[monster_fly.frame_value];
			display.drawObject(
				assets_manager.ghost_image,
				frame.x, frame.y,
				monster_fly.x + Math.floor(monster_fly.width * 0.5 - frame.width * 0.5) + frame.offset_x,
				monster_fly.y + frame.offset_y, 
				frame.width, frame.height
			);
		}

		for (let index = game.world.monster_jumper.length - 1; index > -1; -- index) {
			let monster_jumper = game.world.monster_jumper[index];
			frame = game.world.tile_set.frames[monster_jumper.frame_value];
			display.drawObject(
				assets_manager.fire_skull_image,
				frame.x, frame.y,
				monster_jumper.x + Math.floor(monster_jumper.width * 0.5 - frame.width * 0.5) + frame.offset_x,
				monster_jumper.y + frame.offset_y, 
				frame.width, frame.height
			);
		}

		display.render();
	};

	var update = function() {
		if (controller.left.active) { game.world.player.moveLeft(); }
		if (controller.right.active) { game.world.player.moveRight(); }
		if (controller.squat.active) { game.world.player.squat(); }
		if (controller.attack.active) { game.world.player.attack(); }
		if (controller.up.active) { game.world.player.jump(); controller.up.active = false; }
		if (controller.inventory.active) { controller.inventory.active = false; }
		if (controller.escape.active) { controller.escape.active = false; }
		if (controller.pause.active) { pauseGame(); controller.pause.active = false; }
		game.update();
		if (game.world.door) {
			engine.stop();
			assets_manager.requestJSON(ZONE_PREFIX + game.world.door.destination_zone + ZONE_SUFFIX, (zone) => {
				game.world.setup(zone);
				engine.start();
			});
			return;
		}
	};

	var assets_manager = new AssetsManager();
	var controller = new Controller();
	var display = new Display(document.querySelector("canvas"));
	var game = new Game();
	var engine = new Engine(1000 / 40, render, update);

	var p = document.createElement("p");
	p.setAttribute("style", "color: red; font-size:28px; position: fixed;");
	p.textContent = "HEALTH: 0";
	document.body.appendChild(p);

	display.buffer.canvas.height = game.world.height;
	display.buffer.canvas.width = game.world.width;
	display.buffer.imageSmoothingEnabled = false;

	playMusic(gameLvl1Music);

	assets_manager.requestJSON(ZONE_PREFIX + game.world.zone_id + ZONE_SUFFIX, (zone) => {
		game.world.setup(zone);

		assets_manager.requestImage("assets/Tiles/tiles_spritesheet.png", (image) => {
			assets_manager.tile_set_image = image;
			resize();
			engine.start();
		});
		assets_manager.requestImage("assets/Characters/Alucard(Hero)/alucard.png", (image) => { assets_manager.player_image = image; });
		assets_manager.requestImage("assets/UI/heart_life.png", (image) => { assets_manager.heal_health_image = image; });
		assets_manager.requestImage("assets/Decorations/Animated Decorations/torch_big/torch_big_bg.png", (image) => { assets_manager.torch_image = image; });
		assets_manager.requestImage("assets/Characters/Skull/fire_skull.png", (image) => { assets_manager.fire_skull_image = image; });
		assets_manager.requestImage("assets/Characters/Skull/dark_skull.png", (image) => { assets_manager.dark_skull_image = image; });
		assets_manager.requestImage("assets/Characters/Nightmare/nightmare.png", (image) => { assets_manager.nightmare_image = image; });
		assets_manager.requestImage("assets/Characters/Ghost/ghost_sheet.png", (image) => { assets_manager.ghost_image = image; });
	});
	window.addEventListener("keydown", keyDownUp);
	window.addEventListener("keyup", keyDownUp);
	window.addEventListener("resize", resize);
});
