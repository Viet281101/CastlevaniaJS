var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;
var butterflies = [];
var numButterflies = 9;
var scale = 2;
var butterflyFrames = [];

for (var i = 1; i < 17; i++) {
    var img = new Image();
    img.src = 'assets/Butterfly/butterfly_' + i + '.png';
    butterflyFrames.push(img);
}

function createButterfly() {
    return {
        x: Math.random() * w,
        y: Math.random() * h,
        ang: Math.random() * 2 * Math.PI,
        s: Math.random() * 2 * scale,
        frame: 0,
        move: function() {
            this.v = (this.s * this.s) / 4;
            this.x += this.v * Math.cos(this.ang);
            this.y += this.v * Math.sin(this.ang);
            this.ang += (Math.random() * 20 * Math.PI) / 180 - (10 * Math.PI) / 180;
            this.frame = (this.frame + 1) % butterflyFrames.length;
        }
    };
}

for (var i = 0; i < numButterflies; i++) {
    butterflies.push(createButterfly());
}

function drawButterfly(butterfly) {
    ctx.drawImage(butterflyFrames[butterfly.frame], butterfly.x, butterfly.y, 32 * scale, 32 * scale);
}

function animate() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < butterflies.length; i++) {
        butterflies[i].move();
        drawButterfly(butterflies[i]);
    }
    requestAnimationFrame(animate);
}

animate();