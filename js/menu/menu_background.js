//////* ----- All Menu Background Element ----- *//////
var radius = 80;
var influenceArea = {
    x: 100,
    y: 100,
    width: radius * 2,
    height: radius * 2
};
document.addEventListener('DOMContentLoaded', function() {
    loadMusicBackground();
    defineKeyframes();
    createFadeInIntro();

    //////*  Background Layers   *//////
    var backgroundLayer1 = document.createElement('div');
    applyBackgroundStyles(backgroundLayer1, './assets/Background/background_graveyard.png', 1);
    document.body.appendChild(backgroundLayer1);

    var backgroundLayer2 = document.createElement('div');
    applyBackgroundStyles(backgroundLayer2, './assets/Background/background_castle_no_fog.png', 2);
    document.body.appendChild(backgroundLayer2);

    //////*  Play Fog Effect   *//////
    let fogScript = document.createElement('script');
    fogScript.setAttribute("type", "text/javascript");
    fogScript.setAttribute("src", "./js/effects/fog.js");
    document.body.appendChild(fogScript);
    setTimeout(() => {
        let fogEffect = new FogEffect();
        document.addEventListener('mousemove', function(e) {
            fogEffect.updateFogMask(0.3);
        });
    }, 1000);

    //////*  Play Fireflies Effect   *//////
    let firefliesScript = document.createElement('script');
    firefliesScript.setAttribute("type", "text/javascript");
    firefliesScript.setAttribute("src", "./js/effects/fireflies.js");
    setTimeout(() => {
        document.body.appendChild(firefliesScript);
    }, 4000);

    //////*  Background mouse mask   *//////
    setTimeout(() => {
        document.addEventListener('mousemove', function(e) {
            updateBackgroundMask(backgroundLayer2, e.clientX, e.clientY, radius);
            influenceArea.x = e.clientX - influenceArea.width / 2;
            influenceArea.y = e.clientY - influenceArea.height / 2;
        });
        document.addEventListener('mousedown', function(e) {
            radius = 1200;
            updateMouseMask(backgroundLayer2, e.clientX, e.clientY, radius);
        });
        document.addEventListener('mouseup', function(e) {
            radius = 80;
            updateMouseMask(backgroundLayer2, e.clientX, e.clientY, radius);
        });
    }, 6500);
});

//////*  Create Music Background   *//////
function loadMusicScript(src) {
	return new Promise(function(resolve, reject) {
		var soundScript = document.createElement("script");
		soundScript.setAttribute("type", "text/javascript");
		soundScript.setAttribute("src", src);
		soundScript.onload = () => resolve(soundScript);
		soundScript.onerror = () => reject(new Error(`Script load error for ${src}.`));
		document.head.appendChild(soundScript);
	});
};
async function loadMusicBackground() {
	try {
		await loadMusicScript("./js/sound/music.js");
		playMusic(mainMenuMusic);
	} catch (e) {
		console.log(e);
	}
};
//////*  Create & Update Background Effects  *//////
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
function updateMouseMask(backgroundLayer, x, y, radius) {
    influenceArea.width = radius * 2;
    influenceArea.height = radius * 2;
    updateBackgroundMask(backgroundLayer, x, y, radius);
};
function updateBackgroundMask(element, x, y, maskSize) {
    element.style.webkitMaskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
    element.style.maskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
};
//////*  Create intro fade in image menu   *//////
function defineKeyframes() {
    var styleSheet = document.createElement("style");
    styleSheet.setAttribute("type", "text/css");
    styleSheet.innerText = `@keyframes fadeIn { 0% {background: rgb(0, 0, 0, 1);} 100% {background: rgb(0, 0, 0, 0);} }
    @keyframes introFadeIn { from { opacity: 1; } to { opacity: 0; } }`;
    document.head.appendChild(styleSheet);
};
function createFadeInIntro() {
    var fadeInDiv = document.createElement('div');
    fadeInDiv.className = 'fade-in';
    fadeInDiv.style.background = 'rgb(0, 0, 0, 1)';
    fadeInDiv.style.zIndex = 9;
    fadeInDiv.style.position = 'fixed';
    fadeInDiv.style.top = '0';
    fadeInDiv.style.left = '0';
    fadeInDiv.style.width = '100%';
    fadeInDiv.style.height = '100%';
    fadeInDiv.style.animation = 'fadeIn 20s forwards';
    document.body.appendChild(fadeInDiv);

    var introBackgroundDiv = document.createElement('div');
    introBackgroundDiv.className = 'intro-background';
    introBackgroundDiv.style.position = 'fixed';
    introBackgroundDiv.style.top = '0';
    introBackgroundDiv.style.left = '0';
    introBackgroundDiv.style.width = '100%';
    introBackgroundDiv.style.height = '100%';
    introBackgroundDiv.style.backgroundImage = "url('./assets/Castlevania.png')";
    introBackgroundDiv.style.backgroundSize = 'cover';
    introBackgroundDiv.style.zIndex = 10;
    introBackgroundDiv.style.animation = 'introFadeIn 8s ease-out forwards';
    document.body.appendChild(introBackgroundDiv);

    introBackgroundDiv.addEventListener('animationend', function() {
        introBackgroundDiv.remove();
        setTimeout(() => { fadeInDiv.remove(); }, 2500);
        document.dispatchEvent(new CustomEvent('introAnimationEnded'));
    });
};
