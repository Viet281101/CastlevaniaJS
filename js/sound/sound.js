///////* ------- Setup sounds effect ------- *///////
const silentAudio = new Audio('data:audio/mp3;base64,//MkxAA........');
const hoverSound = new Audio(
  'https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/btn_hover.wav?raw=true'
);
const clickSound = new Audio(
  'https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/btn_click.wav?raw=true'
);

function setSoundVolume(volume) {
  volume = Math.max(0, Math.min(1, volume));
  hoverSound.volume = volume;
  clickSound.volume = volume;
}
