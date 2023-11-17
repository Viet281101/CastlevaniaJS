
const canvas = document.createElement('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(animate);
};

