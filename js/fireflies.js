
let c = init('canvas');
w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;


////// Initiation
let scale = 1.4;
let number = 200;

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
        c.beginPath();
        c.arc(this.x, this.y, this.s, 0, 2 * Math.PI);
        c.fillStyle = '#c06228';
        c.fill();
    }
}

let fireflies = [];

function draw() {
    //// fireflies
    if (fireflies.length < number) {
        for (let j = 0; j < 10; j++) {
            fireflies.push(new Firefly());
        }
    }

    //// animation
    for (let i = 0; i < fireflies.length; i++) {
        fireflies[i].move();
        fireflies[i].show();
        if (fireflies[i].x > w || fireflies[i].x < 0 || fireflies[i].y > h || fireflies[i].y < 0) {
            fireflies.splice(i, 1);
        }
    }
}

let mouse = {};
let last_mouse = {};

canvas.addEventListener(
    "mouseover", 
    function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false 
);

function init(elemid) {
    let canvas = document.getElementById(elemid), 
    c = canvas.getContext('2d'), 
    w = (canvas.width = window.innerWidth), 
    h = (canvas.height = window.innerHeight);

    c.fillStyle = 'rgba(30, 30, 30, 1)';
    c.fillRect(0, 0, w, h);
    return c;
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
    c.clearRect(0, 0, w, h);
    draw();
    window.requestAnimationFrame(loop);
};

window.addEventListener('resize', function () {
    (w = canvas.width = window.innerWidth), 
    (h = canvas.height = window.innerHeight);
    loop();
});

var delayInMilliseconds = 3600;

setTimeout(function () {
    loop();
    setInterval(loop, 1000 / 60);
}, delayInMilliseconds);

