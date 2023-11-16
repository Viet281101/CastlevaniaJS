// Create a silent audio element
var silentAudio = new Audio("data:audio/mp3;base64,//MkxAA........");

// Define your other sounds
var hoverSound = new Audio("https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/btn_hover.wav?raw=true");
var clickSound = new Audio("https://github.com/Viet281101/CastlevaniaJS/blob/main/assets/Sound/btn_click.wav?raw=true");

// Example: Play the silent audio when the user clicks a button
document.getElementById('startButton').addEventListener('click', function () {
    silentAudio.play().catch(function(error) {
        console.log('Autoplay prevented for silent audio. Initiating playback on user action.');
    });
    window.location.assign('game.html');
    clickSound.play();
});

document.getElementById('settingButton').addEventListener('click', function () {
    clickSound.play();
});

document.getElementById('creditButton').addEventListener('click', function () {
    clickSound.play();
});

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

document.addEventListener("DOMContentLoaded", function () {
    const menuButtons = document.querySelectorAll(".menuButton");

    menuButtons.forEach(function (button) {
        button.addEventListener("mouseover", function () {
            button.style.fontSize = "55px";
            button.style.textShadow = "0 0 10px #f6f2ff";
            hoverSound.play();
        });

        button.addEventListener("mouseout", function () {
            button.style.fontSize = "50px";
            button.style.textShadow = "none";
        });
    });
});
