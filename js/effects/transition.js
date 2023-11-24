
//////*  Transition Effect   *//////
class TransitionEffect {
    constructor() {
        this.transitionScreen = document.createElement('div');
        this.transitionScreen.id = 'transitionScreen';
        this.transitionScreen.style.display = 'none';
        this.transitionScreen.style.position = 'fixed';
        this.transitionScreen.style.top = 0;
        this.transitionScreen.style.left = 0;
        this.transitionScreen.style.width = '100%';
        this.transitionScreen.style.height = '100vh';
        this.transitionScreen.style.backgroundColor = 'rgba(0,0,0,0)';
        this.transitionScreen.style.zIndex = 9;
        document.body.appendChild(this.transitionScreen);

        this.start = function (target) {
            this.transitionScreen.style.display = 'block';
            var opacity = 0;

            var fadeEffect = setInterval(() => {
                if (opacity < 1) {
                    opacity += 0.1;
                    this.transitionScreen.style.backgroundColor = 'rgba(0,0,0,' + opacity + ')';
                } else {
                    clearInterval(fadeEffect);
                    if (typeof target === 'string') {
                        window.location.assign(target);
                    } else if (typeof target === 'function') {
                        target();
                    }
                }
            }, 100);
        };
    }
}


