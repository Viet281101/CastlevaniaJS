var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var scale = 4;
var numbers = 1;
var animateSpeed = 120;
var speed = 8;

class Butterfly {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.angle = Math.random() * 2 * Math.PI;
		this.velocity = (speed * speed) / 4;
		this.frame = 0;
	}

	move() {
		this.x += this.velocity * Math.cos(this.angle);
		this.y += this.velocity * Math.sin(this.angle);
	
		if (this.x < 0 || this.x > canvas.width - 32 * scale) {
			this.angle = Math.PI - this.angle;
		}
		if (this.y < 0 || this.y > canvas.height - 32 * scale) {
			this.angle = -this.angle;
		}
	
		this.angle += (Math.random() * 20 * Math.PI) / 180 - (10 * Math.PI) / 180;
	}

	draw() {
		ctx.imageSmoothingEnabled = false;
		var img = new Image();
		img.src = 'assets/Butterfly/butterfly_' + (this.frame + 1) + '.png';
		ctx.drawImage(img, this.x, this.y, 32 * scale, 32 * scale);

		var gradient = ctx.createRadialGradient(
			this.x + 16 * scale, this.y + 16 * scale, 0, 
			this.x + 16 * scale, this.y + 16 * scale, 32 * scale
		);
		gradient.addColorStop(0, 'rgba(124, 73, 255, 0.3)');
		gradient.addColorStop(1, 'rgba(124, 73, 255, 0)');

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(this.x + 16 * scale, this.y + 16 * scale, 32 * scale, 0, 2 * Math.PI);
		ctx.fill();
	}

	update() {
		this.move();
		this.draw();
		this.frame = (this.frame + 1) % 16;
	}
}

var butterflies = [];
for (let i = 0; i < numbers; i++) {
	butterflies.push(new Butterfly());
}

function checkCollision(butterfly1, butterfly2) {
    var dx = butterfly1.x - butterfly2.x;
    var dy = butterfly1.y - butterfly2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 32 * scale) {
        butterfly1.angle += Math.PI / 2;
        butterfly2.angle += Math.PI / 2;
    }
};

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < butterflies.length; i++) {
		butterflies[i].update();
		for (let j = i + 1; j < butterflies.length; j++) {
			checkCollision(butterflies[i], butterflies[j]);
		}
	}
	setTimeout(animate, animateSpeed);
};

animate();