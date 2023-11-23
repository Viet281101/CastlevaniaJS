
//////*  Background element   *//////
var radius = 100;
var influenceArea = {
    x: 100,
    y: 100,
    width: radius * 2,
    height: radius * 2
};
document.addEventListener('DOMContentLoaded', function() {
    var backgroundLayer1 = document.createElement('div');
    applyBackgroundStyles(backgroundLayer1, 'assets/Background/background_graveyard.png', 1);
    document.body.appendChild(backgroundLayer1);

    var backgroundLayer2 = document.createElement('div');
    applyBackgroundStyles(backgroundLayer2, 'assets/Background/background_castle_no_fog.png', 2);
    document.body.appendChild(backgroundLayer2);

    document.addEventListener('mousemove', function(e) {
        updateBackgroundMask(backgroundLayer2, e.clientX, e.clientY, radius);
        influenceArea.x = e.clientX - influenceArea.width / 2;
        influenceArea.y = e.clientY - influenceArea.height / 2;
    });
});

function applyBackgroundStyles(element, imageUrl, zIndex) {
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '100%';
    element.style.height = '100vh';
    element.style.backgroundImage = 'url(' + imageUrl + ')';
    element.style.backgroundSize = 'cover';
    element.style.zIndex = zIndex;
};

function updateBackgroundMask(element, x, y, maskSize) {
    element.style.webkitMaskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
    element.style.maskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
};


//////*  Transition Effect   *//////
document.addEventListener('DOMContentLoaded', function() {
    var transitionScreen = document.createElement('div');
    transitionScreen.id = 'transitionScreen';
    transitionScreen.style.display = 'none';
    transitionScreen.style.position = 'fixed';
    transitionScreen.style.top = 0;
    transitionScreen.style.left = 0;
    transitionScreen.style.width = '100%';
    transitionScreen.style.height = '100vh';
    transitionScreen.style.backgroundColor = 'rgba(0,0,0,0)';
    transitionScreen.style.zIndex = 9;
    document.body.appendChild(transitionScreen);
});

function startTransition(targetURL) {
    var transitionScreen = document.getElementById('transitionScreen');
    transitionScreen.style.display = 'block';
    var opacity = 0;

    var fadeEffect = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.1;
            transitionScreen.style.backgroundColor = 'rgba(0,0,0,' + opacity + ')';
        } else {
            clearInterval(fadeEffect);
            window.location.assign(targetURL);
        }
    }, 100);
};


//////*  Fog Effect   *//////
document.addEventListener('DOMContentLoaded', function() {
    var fogContainer = document.createElement('div');
    fogContainer.style.position = 'fixed';
    fogContainer.style.top = 0;
    fogContainer.style.left = 0;
    fogContainer.style.width = '100%';
    fogContainer.style.height = '100%';
    fogContainer.style.zIndex = 3;
    fogContainer.style.opacity = 0;
    fogContainer.style.background = 'url("assets/Background/fog.png") repeat-x';
    fogContainer.style.backgroundSize = '60% auto';
    fogContainer.style.backgroundPosition = '0 bottom';

    document.body.appendChild(fogContainer);

    var keyframes = '@keyframes fogAnim { 0% { background-position: -200% bottom; } 100% { background-position: 0% bottom; } }';
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);

    fogContainer.style.animation = 'fogAnim 55s linear infinite';

    setTimeout(() => {
        fogContainer.style.transition = 'opacity 9s ease-in';
        fogContainer.style.opacity = 0.3;
    }, 1000);
});

