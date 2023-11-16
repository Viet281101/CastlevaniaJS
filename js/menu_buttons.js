

//////*  Sounds   *//////
var hoverSound = new Audio('../assets/Sound/btn_hover.wav');
var clickSound = new Audio('../assets/Sound/btn_click.wav');


//////*  Start button   *//////
document.getElementById('startButton').addEventListener('click', function () {
    window.location.href = '../game.html';
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

