
///////* ------- Setup music background ------- */////// 
var mainMenuMusic = new Audio("https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/music_main_menu.ogg?raw=true");
var creditsMenuMusic = null;
var gameLvl1Music = null;
var gameLvl2Music = null;

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
