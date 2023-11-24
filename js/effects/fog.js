
//////*  Fog Effect   *//////

class FogEffect {
    constructor() {
        this.fogContainer = document.createElement('div');
        this.fogContainer.style.position = 'fixed';
        this.fogContainer.style.top = 0;
        this.fogContainer.style.left = 0;
        this.fogContainer.style.width = '100%';
        this.fogContainer.style.height = '100%';
        this.fogContainer.style.zIndex = 3;
        this.fogContainer.style.opacity = 0;
        this.fogContainer.style.background = 'url("assets/Background/fog.png") repeat-x';
        this.fogContainer.style.backgroundSize = '60% auto';
        this.fogContainer.style.backgroundPosition = '0 bottom';

        document.body.appendChild(this.fogContainer);

        var keyframes = '@keyframes fogAnim { 0% { background-position: -200% bottom; } 100% { background-position: 0% bottom; } }';
        var styleSheet = document.createElement("style");
        styleSheet.setAttribute("type", "text/css");
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);

        this.fogContainer.style.animation = 'fogAnim 55s linear infinite';

        this.fogContainer.style.transition = 'opacity 9s ease-in';
        this.fogContainer.style.opacity = 0.3;
    }

    updateFogMask(x, y, maskSize) {
        this.fogContainer.style.webkitMaskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
        this.fogContainer.style.maskImage = `radial-gradient(circle ${maskSize}px at ${x}px ${y}px, transparent 100%, black 100%)`;
    }

    updateFogOpacity(opacity) {
        this.fogContainer.style.opacity = opacity;
    }
};

// //////*  Fog Effect Exemple Use   *//////
// document.addEventListener('DOMContentLoaded', function() {
//     var fogEffect = new FogEffect();
//     fogEffect.updateFogOpacity(0.3);
// });



