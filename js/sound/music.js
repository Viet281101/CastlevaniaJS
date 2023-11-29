
///////* ------- Setup music background ------- */////// 
var mainMenuMusic = new Audio("https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/music_main_menu.ogg?raw=true");
var creditsMenuMusic = null;
var gameLvl1Music = new Audio("https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/lvl1_music.wav?raw=true");
var gameLvl2Music = new Audio("https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/lvl2_music.wav?raw=true");
var bossMusic = new Audio("https://github.com/Viet2811/CastlevaniaJS/blob/main/assets/Sound/lvl2-music_boss.wav?raw=true");


function setMusicVolume(volume) {
    volume = Math.max(0, Math.min(1, volume));
    mainMenuMusic.volume = volume;
};

function playMusic(music) {
    music.loop = true;
    music.play();
};

function stopMusic(music) {
    music.pause();
    music.currentTime = 0;
};

