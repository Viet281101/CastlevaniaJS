
//* ~~~ Game stats (for save and load) ~~~ *//

const font = 'Castlevania';
const totalLevels = 2;

var gameOver;
var gameWon;
var gamePaused;
var enemiesKilled;
var levelDisplay;
var currentLevel;
var currentZone = "00";

var score = 0;
var currentScore = 0;
var playerCharacter;
var playerHealth;
var playerMaxHealth;
var playerPosX = 0;
var playerPosY = 130;

var optionId= '';
const userKeys = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	W: 87,
	S: 83,
	A: 65,
	D: 68,
	SPACE: 32,
	P: 80,
	M: 77,
	C: 67
};
const specialKeys = {
	8:'Backspace',
	9:'Tab',
	13:'Enter',
	16:'Shift',
	17:'Ctrl',
	18:'Alt',
	19:'Pause/break',
	20:'Caps lock',
	27: 'Escape',
	32:'Space',
	33:'Page up',
	34:'Page down',
	35:'End',
	36:'Home',
	37:'Left',
	38:'Up',
	39:'Right',
	40:'Down',
	45:'Insert',
	46:'Delete',
	91:'LeftwinKey',
	92:'RightwinKey',
	106:'Multiply',
	107:'Add',
	111:'Divide',
	187:'Equal',
	188:'Comma',
	189:'Dash',
	190:'Period',
	191:'Slash',
	192:'GraveAccent',
	219:'OpenBracket',
	220:'BackSlash',
	221:'CloseBraket',
	222:'SingleQuote'
};



function pauseGame() {
    gamePaused = !gamePaused;
    if (gamePaused) {
        engine.stop();
        stopMusic(gameLvl1Music);
        stopMusic(gameLvl2Music);
        stopMusic(bossMusic);
    }
    else {
        engine.start();
        if (levelDisplay == "01") playMusic(gameLvl1Music);
        else if (levelDisplay == "02") playMusic(gameLvl2Music);
        else if (levelDisplay == "03") playMusic(bossMusic);
    }
}

function changeOption(key){
	var chr = String.fromCharCode(key);
	if (optionId!== '' && !Object.values(userKeys).includes(key)){
		if (48 <= key && key <= 90 ){
			document.getElementById(optionId).value = chr;
			userKeys[optionId] = key;
		} else if (key in specialKeys){
			document.getElementById(optionId).value = specialKeys[key];
			userKeys[optionId] = key;
		}
	} else if (keysPressed[userKeys.M] && optionId !== 'M'){
		dispMess('M','SOUND');
	} else {
		document.getElementById('mess').innerHTML = 'You can\'t use this key';
	}
}

////// Need to complete those functions after //////
//// Display message to change key ////
function dispMess(id, text){
	document.getElementById('mess').innerHTML = 'Press a key to change '+text+' key';
	optionId = id;
}

//// Save and load game ////
function saveGame() {
	let save = {
		levelDisplay: levelDisplay,
		score: score,
		currentScore: currentScore,
		currentLevel: currentLevel,
		currentZone: currentZone,
		playerCharacter: playerCharacter,
		playerHealth: playerHealth,
		playerMaxHealth: playerMaxHealth,
		playerPosX: playerPosX,
		playerPosY: playerPosY,
		userKeys: userKeys
	};
	localStorage.setItem("save",JSON.stringify(save));
}
function loadGame() {
	let save = JSON.parse(localStorage.getItem("save"));
	if (save) {
		levelDisplay = save.levelDisplay;
		score = save.score;
		currentScore = save.currentScore;
		currentLevel = save.currentLevel;
		currentZone = save.currentZone;
		playerCharacter = save.playerCharacter;
		playerHealth = save.playerHealth;
		playerMaxHealth = save.playerMaxHealth;
		playerPosX = save.playerPosX;
		playerPosY = save.playerPosY;
		userKeys = save.userKeys;
	}
}
