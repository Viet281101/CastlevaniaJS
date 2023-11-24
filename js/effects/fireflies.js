/////* ----------- FIREFLY EFFECT ----------- */////
let ctx = init('canvas');
canvas.style.position = 'relative';
canvas.style.zIndex = 3;
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;


////// Initiation
let scale = 1.8;
let number = 260;

////// Mouse
let mouse = {};
let last_mouse = {};
canvas.addEventListener("mouseover", function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false );

class Firefly {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.ang = Math.random() * 2 * Math.PI;
        this.s = Math.random() * 2 * scale;
        this.v = (this.s * this.s) / 4;
    }
    move() {
        this.x += this.v * Math.cos(this.ang);
        this.y += this.v * Math.sin(this.ang);
        this.and += (Math.random() * 20 * Math.PI) / 180 - (10 * Math.PI) / 180;
    }
    show() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
        if (this.x > influenceArea.x && this.x < influenceArea.x + influenceArea.width &&
            this.y > influenceArea.y && this.y < influenceArea.y + influenceArea.height) {
            ctx.fillStyle = '#e40093';
        } else {
            ctx.fillStyle = '#c06228';
        }
        ctx.fill();
    }
}

let fireflies = [];

function draw() {
    //// Fireflies
    if (fireflies.length < number) {
        for (let j = 0; j < 10; j++) {
            fireflies.push(new Firefly());
        }
    }

    //// Animation
    for (let i = 0; i < fireflies.length; i++) {
        fireflies[i].move();
        fireflies[i].show();
        if (fireflies[i].x > w || fireflies[i].x < 0 || fireflies[i].y > h || fireflies[i].y < 0) {
            fireflies.splice(i, 1);
        }
    }
};

function init(elemid) {
    let canvas = document.getElementById(elemid),
    ctx = canvas.getContext('2d'), 
    w = (canvas.width = window.innerWidth), 
    h = (canvas.height = window.innerHeight);
    ctx.fillStyle = 'rgba(30, 30, 30, 1)';
    ctx.fillRect(0, 0, w, h);
    return ctx;
};

window.requestAnimationFrame = function () {
    return (
        window.requestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback);
        }
    );
};

function loop() {
    ctx.clearRect(0, 0, w, h);
    draw();
    window.requestAnimationFrame(loop);
};

window.addEventListener('resize', function () {
    (w = canvas.width = window.innerWidth), 
    (h = canvas.height = window.innerHeight);
    loop();
});

loop();
setInterval(loop, 1000 / 60);

