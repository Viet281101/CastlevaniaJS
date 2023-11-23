
//////*  Transition Effect   *//////
document.addEventListener('DOMContentLoaded', function() {
    createTransitionElement();
});

function createTransitionElement() {
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
};

function startTransition(target) {
    var transitionScreen = document.getElementById('transitionScreen');
    transitionScreen.style.display = 'block';
    var opacity = 0;

    var fadeEffect = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.1;
            transitionScreen.style.backgroundColor = 'rgba(0,0,0,' + opacity + ')';
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


// class TransitionEffect {
//     constructor() {
//         this.transitionScreen = document.createElement('div');
//         this.transitionScreen.id = 'transitionScreen';
//         this.transitionScreen.style.display = 'none';
//         this.transitionScreen.style.position = 'fixed';
//         this.transitionScreen.style.top = 0;
//         this.transitionScreen.style.left = 0;
//         this.transitionScreen.style.width = '100%';
//         this.transitionScreen.style.height = '100vh';
//         this.transitionScreen.style.backgroundColor = 'rgba(0,0,0,0)';
//         this.transitionScreen.style.zIndex = 9;
//         document.body.appendChild(this.transitionScreen);
//     }

//     startTransition(target) {
//         this.transitionScreen.style.display = 'block';
//         var opacity = 0;

//         var fadeEffect = setInterval(function () {
//             if (opacity < 1) {
//                 opacity += 0.1;
//                 this.transitionScreen.style.backgroundColor = 'rgba(0,0,0,' + opacity + ')';
//             } else {
//                 clearInterval(fadeEffect);
//                 if (typeof target === 'string') {
//                     window.location.assign(target);
//                 } else if (typeof target === 'function') {
//                     target();
//                 }
//             }
//         }, 100);
//     }
// };

