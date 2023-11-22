

//////*  Sounds   *//////
var silentAudio = new Audio("data:audio/mp3;base64,//MkxAA........");

var hoverSound = new Audio("https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/btn_hover.wav?raw=true");
var clickSound = new Audio("https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/btn_click.wav?raw=true");


//////*  Start button   *//////
document.getElementById('startButton').addEventListener('click', function () {
    silentAudio.play().catch(function(error) {
        console.log('Autoplay prevented for silent audio. Initiating playback on user action.');
    });
    window.location.assign('game.html?01');
    clickSound.play();
});


//////*  Settings button   *//////
document.getElementById('settingButton').addEventListener('click', function () {
    clickSound.play();

});


//////*  Credits button   *//////
document.getElementById('creditButton').addEventListener('click', function () {
    clickSound.play();

});


//////*  Quit button   *//////
document.getElementById('quitButton').addEventListener('click', function () {
    clickSound.play();
    if (confirm("Are you sure you want to quit?")) {
        try {
            window.close();
        } catch (e) {
            alert("You can't close this window! Please close the browser tab instead.");
        }
    }
});


//////*  About buttons   *//////
document.addEventListener("DOMContentLoaded", function () {

    const menuButtons = document.querySelectorAll(".menuButton");

    menuButtons.forEach(function (button) {
        let textSize = parseInt(window.getComputedStyle(button).fontSize);
        let textSizeHover = textSize + (textSize * 0.1);
        
        button.setAttribute('title', button.textContent);

        button.addEventListener("mouseover", function () {
            button.style.fontSize = textSizeHover + "px";
            button.style.textShadow = "0 0 10px #f6f2ff";
            hoverSound.play();
        });

        button.addEventListener("mouseout", function () {
            button.style.fontSize = textSize + "px";
            button.style.textShadow = "none";
        });
    });
});


//////*  Disable menu interaction   *//////
function disableMenuInteraction() {
    var menuButtons = document.querySelectorAll(".menuButton");
    menuButtons.forEach(function (button) {
        button.classList.add("disable-interaction");
        button.style.opacity = "0";
    });
};

function enableMenuInteraction() {
    var menuButtons = document.querySelectorAll(".menuButton");
    menuButtons.forEach(function (button) {
        button.classList.remove("disable-interaction");
        button.style.opacity = "1";
    });
};

disableMenuInteraction();
setTimeout(function () {
    enableMenuInteraction();
}, 4500);


//////*  Remove intro element   *//////
document.addEventListener('DOMContentLoaded', function() {
    var introElement = document.querySelector('.intro-background');
    if (introElement) {
        introElement.addEventListener('animationend', removeIntroElement);
    }
});

function removeIntroElement() {
    var introElement = document.querySelector('.intro-background');
    if (introElement) {
        introElement.parentNode.removeChild(introElement);
        // Or introElement.style.display = 'none';
    }
};


//////*  Background element   *//////
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var bodyElement = document.body;
var backgroundImgUrl = new Image();
backgroundImgUrl.src = "assets/Background/background_castle_no_fog.png";
var backgroundSize = "cover";
var backgroundRepeat = "repeat-x";

bodyElement.style.backgroundImage = `url(${backgroundImgUrl.src})`;
bodyElement.style.backgroundSize = backgroundSize;
bodyElement.style.backgroundRepeat = backgroundRepeat;

