/////* ----------- BUTTERFLY EFFECT ----------- */////
let canvas = document.getElementById('butterflyCanvas');
context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var scaleButterflies = 4;
var numbers = Math.floor(Math.random() * (4 - 1 + 1) + 1);
var animateSpeed = 120;
var speed = 10;

class Butterfly {
  constructor() {
    this.x = Math.random() * (canvas.width - 32 * scaleButterflies);
    this.y = Math.random() * (canvas.height - 32 * scaleButterflies);
    this.angle = Math.random() * 2 * Math.PI;
    this.velocity = (speed * speed) / 4;
    this.frame = 0;
    this.direction = 'right';
  }

  move() {
    let oldX = this.x;

    this.x += this.velocity * Math.cos(this.angle);
    this.y += this.velocity * Math.sin(this.angle);

    if (this.x > oldX && this.direction !== 'right') {
      this.direction = 'right';
    } else if (this.x < oldX && this.direction !== 'left') {
      this.direction = 'left';
    }

    if (this.x < 0 || this.x > canvas.width - 32 * scaleButterflies) {
      this.angle = Math.PI - this.angle;
    }
    if (this.y < 0 || this.y > canvas.height - 32 * scaleButterflies) {
      this.angle = -this.angle;
    }

    this.angle += (Math.random() * 20 * Math.PI) / 180 - (10 * Math.PI) / 180;
  }

  draw() {
    context.imageSmoothingEnabled = false;
    var img = new Image();
    var imgPrefix = this.direction === 'right' ? 'butterfly_right_' : 'butterfly_';
    img.src = 'assets/Butterfly/' + imgPrefix + (this.frame + 1) + '.png';
    context.drawImage(img, this.x, this.y, 32 * scaleButterflies, 32 * scaleButterflies);

    var gradient = context.createRadialGradient(
      this.x + 16 * scaleButterflies,
      this.y + 16 * scaleButterflies,
      0,
      this.x + 16 * scaleButterflies,
      this.y + 16 * scaleButterflies,
      32 * scaleButterflies
    );
    gradient.addColorStop(0, 'rgba(124, 73, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(124, 73, 255, 0)');

    context.fillStyle = gradient;
    context.beginPath();
    context.arc(
      this.x + 16 * scaleButterflies,
      this.y + 16 * scaleButterflies,
      32 * scaleButterflies,
      0,
      2 * Math.PI
    );
    context.fill();
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

  if (distance < 32 * scaleButterflies) {
    butterfly1.angle += Math.PI / 2;
    butterfly2.angle += Math.PI / 2;
  }
}

function animate() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < butterflies.length; i++) {
    butterflies[i].update();
    for (let j = i + 1; j < butterflies.length; j++) {
      checkCollision(butterflies[i], butterflies[j]);
    }
  }
  setTimeout(animate, animateSpeed);
}

animate();
