///////* ------- Setup sounds effect ------- *///////
var silentAudio = new Audio('data:audio/mp3;base64,//MkxAA........');
var hoverSound = new Audio(
  'https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/btn_hover.wav?raw=true'
);
var clickSound = new Audio(
  'https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/btn_click.wav?raw=true'
);

function setSoundVolume(volume) {
  volume = Math.max(0, Math.min(1, volume));
  hoverSound.volume = volume;
  clickSound.volume = volume;
}
