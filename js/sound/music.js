///////* ------- Setup music background ------- *///////
const mainMenuMusic = new Audio(
  'https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/music_main_menu.ogg?raw=true'
);
let creditsMenuMusic = null;
const gameLvl1Music = new Audio(
  'https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/lvl1_music.wav?raw=true'
);
const gameLvl2Music = new Audio(
  'https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/lvl2_music.wav?raw=true'
);
const bossMusic = new Audio(
  'https://github.com/Viet2811/CastlevaniaJS/blob/main/assets/Sound/lvl2-music_boss.wav?raw=true'
);

let musicMute = false;

function setMusicVolume(volume) {
  volume = Math.max(0, Math.min(1, volume));
  if (volume == 0) musicMute = true;
  else {
    musicMute = false;
    mainMenuMusic.volume = volume;
    gameLvl1Music.volume = volume;
    gameLvl2Music.volume = volume;
    bossMusic.volume = volume;
  }
}

function createAndShowNotification() {
  const existingNotification = document.getElementById('musicErrorNotification');
  if (!existingNotification) {
    const notification = document.createElement('div');
    notification.id = 'musicErrorNotification';
    notification.style.display = 'block';
    Object.assign(notification.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: 'red',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
    });
    notification.textContent = 'Cannot play music. Please click to try again.';

    notification.addEventListener('click', () => {
      playMusic(currentlySelectedMusic)
        .then(() => {
          notification.style.display = 'none';
        })
        .catch((error) => {
          console.error('Retry failed: ', error);
        });
    });

    document.body.appendChild(notification);
  } else {
    existingNotification.style.display = 'block';
  }
}

function playMusic(music) {
  music.loop = true;
  if (typeof music.play === 'function') {
    music
      .play()
      .then(() => {
        console.log('Load sound successful !');
      })
      .catch((error) => {
        console.error('Load sound failed: ', error);
        createAndShowNotification();
      });
  }
}

function stopMusic(music) {
  music.pause();
  music.currentTime = 0;
}
