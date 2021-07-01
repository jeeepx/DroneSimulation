var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

window.addEventListener('resize', function () {
    canvas.width = 0.75*window.innerWidth;
    canvas.height = 0.75*window.innerHeight;
    init();
});

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.draw = function () {
        
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'black';
        c.stroke();
        // c.fillStyle = this.color;
        // c.fill();
    }
    this.rotate = function () {
        c.translate(this.x, this.y);
        var rotateAngle = 0.005;
        c.beginPath();
        c.fillStyle = 'hsl(25,100%,50%)';
        c.moveTo(0, 0);

        for (var angle = 0; angle < 2 * Math.PI; angle += 0.01) {
            var xdraw = 150 * Math.cos(3 * angle) * Math.cos(angle);
            var ydraw = 150 * Math.cos(3 * angle) * Math.sin(angle);
            c.lineTo(xdraw, ydraw);
        }
        c.fill();
        c.rotate(rotateAngle);
    }
}

function animate() {
    requestAnimationFrame(animate);
    for (var i = 0; i < circleArray.length; i++) {
        (circleArray[i]).draw();
        (circleArray[i]).rotate();
    }
    c.clearRect(0, 0, innerWidth, innerHeight);
}

var circleArray = [];


function makeCircle() {

    var width = canvas.width;
    var height = canvas.height;

    //calculating radius
    var radius = (0.03 * width) / 2
    if ((0.2 * height) / 2 < (0.2 * width) / 2) {
        radius = (0.03 * height) / 2;
    }
    circleArray=[];
    //drawing 4 circles
    circleArray.push(new Circle(0.25 * width, 0.25 * height, radius));
    console.log(circleArray);

    circleArray[0].draw();
    var cir2 = new Circle(0.75 * width, 0.25 * height, radius);
    circleArray.push(cir2);
    var cir3 = new Circle(0.25 * width, 0.75 * height, radius);
    circleArray.push(cir3);
    var cir4 = new Circle(0.75 * width, 0.75 * height, radius);
    circleArray.push(cir4);
}

function init() {
    makeCircle();
    animate();
}

init();
console.log(circleArray);

