const canvas2 = document.getElementById('canvas2');
var c = canvas2.getContext('2d');

const canvas3 = document.getElementById('joyStick');
var c3 = canvas3.getContext('2d');

const canvas1 = document.getElementById('canvas1');
var c1 = canvas1.getContext('2d');

//sizing canvas
const navBar = document.getElementById('navbar');
var nav = navBar.getBoundingClientRect()
var navBarHeight = nav.height;
canvas3.width = window.innerWidth*0.5;
canvas3.height = window.innerHeight - navBarHeight;
canvas2.width = window.innerWidth * 0.5;
canvas2.height = window.innerHeight - navBarHeight;
canvas1.width = window.innerWidth * 0.5;
canvas1.height = window.innerHeight - navBarHeight;

if (window.innerWidth < 768) {
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight * 0.5;
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight * 0.5;
}

//resizing canvas associated function
function reposition() {
    infoArray = calculateOrigin(); //finding center
    c.clearRect(0, 0, canvas2.width,  canvas2.height);
    //draw box and lines
    drawStatic();
    let postionArray = calculateBodyPosition();
    let x1 = postionArray[2];
    let y1 = postionArray[3];
    let side = postionArray[4]; //drawing propellers start
    c.save();
    c.translate(x1, y1);
    c.rotate(angle1);
    drawingPropeller(); //actually draw propeller
    c.restore();

    c.save();
    c.translate(x1 + side, y1 + side);
    c.rotate(angle4);
    drawingPropeller();
    c.restore();


    c.save();
    c.translate(x1 + side, y1);
    c.rotate(angle2);
    drawingPropeller();
    c.restore();

    c.save();
    c.translate(x1, y1 + side);
    c.rotate(angle3);
    drawingPropeller();
    c.restore();
}



function repositionJoy() {
    //console.log('reposition!!!!!! JOY');
    infoArray = calculateOrigin();
    joyLeft.centerXJ = 0.375 * infoArray[0];
    console.log(joyLeft.centerXJ);
    joyLeft.centerYJ = 0.925 * infoArray[1];
    joyRight.centerXJ = 0.625 * infoArray[0];
    joyRight.centerYJ = 0.925 * infoArray[1];
    joyLeft.radiusJ = 5 * infoArray[2];
    joyRight.radiusJ = 5 * infoArray[2];

    c3.clearRect(0, 0.9 * infoArray[1] - 5 * infoArray[2], canvas2.width, canvas2.height);
    joyLeft.drawOuterCircle();
    joyLeft.drawInnerCircle(0.375 * infoArray[0], 0.925 * infoArray[1]);
    joyRight.drawOuterCircle();
    joyRight.drawInnerCircle(0.625 * infoArray[0], 0.925 * infoArray[1]);
}

window.addEventListener('resize', function () {
        canvas3.width = window.innerWidth * 0.5;
            canvas3.height = window.innerHeight - navBarHeight;
    canvas2.width = window.innerWidth * 0.5;
    canvas2.height = window.innerHeight - navBarHeight;
    canvas1.width = window.innerWidth * 0.5;
    canvas1.height = window.innerHeight - navBarHeight;
    //console.log(window.innerWidth);
    if (window.innerWidth < 768) {
        canvas3.width = window.innerWidth;
        canvas3.height = window.innerHeight * 0.5;
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight * 0.5;
        canvas1.width = window.innerWidth;
        canvas1.height = window.innerHeight * 0.5;
    }
    repositionJoy();
    reposition();
});


var infoArray = calculateOrigin()
var joyLeft = new JoyStick(0.375 * infoArray[0], 0.85 * infoArray[1], 5 * infoArray[2], true);
var joyRight = new JoyStick(0.625 * infoArray[0], 0.85 * infoArray[1], 5 * infoArray[2], false);

canvas3.addEventListener('mousedown', function (event) {
    joyLeft.startDrawing(event);
    joyRight.startDrawing(event);
    //console.log('listend down');
});
canvas3.addEventListener('mousemove', function (event) {

    joyLeft.dragDraw(event);
    joyRight.dragDraw(event);
    //console.log('listend drag');
});
canvas3.addEventListener('mouseup', function (event) {
    joyLeft.stopDrawing(event);
    joyRight.stopDrawing(event);
    //console.log('listend');
});

canvas3.addEventListener('touchstart', function (event) {
    joyLeft.startDrawing(event);
    joyRight.startDrawing(event);
    //console.log('listend down');
});
canvas3.addEventListener('touchmove', function (event) {

    joyLeft.dragDraw(event);
    joyRight.dragDraw(event);
    //console.log('listend drag');
});
canvas3.addEventListener('touchend', function (event) {
    joyLeft.stopDrawing(event);
    joyRight.stopDrawing(event);
    //console.log('listend');
});

var inited = false;
var initialSpeed = 0.1;
var angle1 = 0.005;
var angle2 = 0.005;
var angle3 = 0.005;
var angle4 = 0.005;
var speedControl1 = initialSpeed;
var speedControl4 = initialSpeed;
var speedControl2 = initialSpeed;
var speedControl3 = initialSpeed;
var touched = false;
var pressedL = false;
var pressedR = false;
init();

function JoyStick(centerXJ, centerYJ, radiusJ, left) {
    this.centerXJ = centerXJ;
    this.centerYJ = centerYJ;
    this.radiusJ = radiusJ;
    this.pressed = false;
    this.clickedX;
    this.clickedY;
    this.newCirX;
    this.newCirY;
    this.left = left;
    this.direction;
    this.oldDirection = '';
    this.ascending = 'false';
    this.descending = 'false';

    this.drawOuterCircle = function () {

        c3.beginPath();
        c3.arc(this.centerXJ, this.centerYJ, this.radiusJ, 0, Math.PI * 2, false);
        let gradient = c.createRadialGradient(this.centerXJ, this.centerYJ, this.radiusJ * 0.45, this.centerXJ, this.centerYJ, this.radiusJ);
        gradient.addColorStop(0, '#696969');
        gradient.addColorStop(1, '#404040');
        c3.fillStyle = '#696969';
        c3.fill();
        //console.log('drew Outer Circle Joy');

    }

    this.drawInnerCircle = function (x, y) {

        c3.beginPath();
        c3.arc(x, y, this.radiusJ * 0.45, 0, Math.PI * 2, false);
        let gradient = c.createRadialGradient(this.centerXJ, this.centerYJ, this.radiusJ * 0.15, this.centerXJ, this.centerYJ, this.radiusJ * 0.45);
        gradient.addColorStop(0, '#E8E6E1');
        gradient.addColorStop(1, '#A39E93');
        c3.fillStyle = gradient;
        c3.fill();
        console.log('drew Inner Circle Joy');
    }

    this.startDrawing = function (event) {
        this.pressed = true;
        this.calculateCanvasPosition(event);
        if (this.isInBigCircle()) {
            if (this.left === true) {
                c3.clearRect(0, 0, canvas2.width * 0.5, canvas2.height);
            } else {
                c3.clearRect(canvas2.width * 0.5, 0, canvas2.width, canvas2.height);
            }

            //console.log('clear');
            //console.log('x:' + this.newCirX);
            //console.log('y:' + this.newCirY);

            this.drawOuterCircle();
            this.drawInnerCircle(this.newCirX, this.newCirY);
        } else {
            console.log('not in ');
        }
        if (this.left) {
            pressedL = true;
            pressR = false;
        } else {
            pressedR = true;
            pressedL = false;
        }

    }

    this.dragDraw = function (event) {
        if (this.pressed == true) {
            this.calculateCanvasPosition(event);
            if (this.isInBigCircle()) {
                if (this.left === true) {
                    c3.clearRect(0, 0, canvas2.width * 0.5, canvas2.height);
                } else {
                    c3.clearRect(canvas2.width * 0.5, 0, canvas2.width, canvas2.height);
                }
                // console.log('clear drag');
                // console.log('x:' + this.newCirX);
                // console.log('y:' + this.newCirY);
                this.drawOuterCircle();
                this.drawInnerCircle(this.newCirX, this.newCirY);
                var angle = this.calculateAngle(event);
                //this.calculateCoordinate(angle);
                this.direction = this.getDirection(angle);
                if (this.left === true) {
                    this.changeSpeedL(this.direction);
                } else {
                    this.changeSpeedR(this.direction);
                }
            } else if (this.isInBiggerCircle()) {
                console.log('bigger circle');
                if (this.left === true) {
                    c3.clearRect(0, 0, canvas2.width * 0.5, canvas2.height);
                } else {
                    c3.clearRect(canvas2.width * 0.5, 0, canvas2.width, canvas2.height);
                }
                var angle = this.calculateAngle(event);
                this.calculateCoordinate(angle);
                this.drawOuterCircle();
                this.drawInnerCircle(this.newCirX, this.newCirY);
                this.direction = this.getDirection(angle);
                if (this.left === true) {
                    this.changeSpeedL(this.direction);
                } else {
                    this.changeSpeedR(this.direction);
                }


            } else {
                return;
            }
        }
    }


    this.stopDrawing = function (event) {

        this.pressed = false;
        if (this.left === true) {
            c3.clearRect(0, 0, canvas2.width * 0.5, canvas2.height);
        } else {
            c3.clearRect(canvas2.width * 0.5, 0, canvas2.width, canvas2.height);
        }
        // console.log('clear');
        // console.log(this.isInBigCircle());

        this.drawOuterCircle();
        this.drawInnerCircle(this.centerXJ, this.centerYJ);
        this.backToCenter(this.direction);


    }
    this.calculateCanvasPosition = function (event) {
        if (touched){
            this.clickedX = event.touches[0].clientX;
        console.log('x1: fixed if tou remove cal' + this.clickedX);

        this.clickedY = event.touches[0].clientY;
        console.log('y1: fixed if tou' + this.clickedY);
        }else{
            this.clickedX = event.clientX;
        //console.log('x1: fixed if mouse' + this.clickedX);

        this.clickedY = event.clientY;
        //console.log('y1: fixed if mouse' + this.clickedY);
        }
        const rect = canvas2.getBoundingClientRect()
        this.newCirX = this.clickedX - rect.left;
        this.newCirY = this.clickedY - rect.top;
    }
    this.isInBigCircle = function () {
        let calRadius = Math.sqrt(Math.pow(this.newCirX - this.centerXJ, 2) + Math.pow(this.newCirY - this.centerYJ, 2));
        //console.log('calradius:' + calRadius);
        //console.log('radius:' + this.radiusJ);

        if (calRadius <= this.radiusJ) {
            return true;
        } else {
            return false;
        }
    }
    this.isInBiggerCircle = function () {
        let calRadius = Math.sqrt(Math.pow(this.newCirX - this.centerXJ, 2) + Math.pow(this.newCirY - this.centerYJ, 2));
        //console.log('BGcalradius:' + calRadius);
        //console.log('BGradius:' + this.radiusJ);

        if (calRadius - 40 <= this.radiusJ) {
            //console.log('in biggercircle');

            return true;
        } else {
            //console.log('not inBG');

            return false;

        }
    }

    this.calculateAngle = function () {
        let rad = Math.atan2(this.newCirY - this.centerYJ, this.newCirX - this.centerXJ);
        console.log('degree in calAngle: ' + rad * 180 / Math.PI);
        return rad;
    }
    this.calculateCoordinate = function (angle) {
        this.newCirX = Math.cos(angle) * this.radiusJ + this.centerXJ;
        this.newCirY = Math.sin(angle) * this.radiusJ + this.centerYJ;
    }
    this.getDirection = function (angle) {
        let deg = (angle * 180 / Math.PI) * -1;
        if (deg < 0) {
            let factor = 180 + deg;
            deg = 180 + factor;
        }
        console.log('degree in getDirection:' + deg);
        let oct = Math.floor(deg / 45);
        //console.log('divide by 45: ' + oct);
        let DirArray = ['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE'];
        console.log(DirArray[oct]);
        return DirArray[oct];

    }

    this.changeSpeedL = function (direction) {
        if (direction === 'N') {
            this.ascending = true;
            if (speedControl1 <= 0.35) {
                speedControl1 += 0.005;
            }
            if (speedControl2 <= 0.35) {
                speedControl2 += 0.005;
            }
            if (speedControl3 <= 0.35) {
                speedControl3 += 0.005;
            }
            if (speedControl4 <= 0.35) {
                speedControl4 += 0.005;
            }

        } else if (direction === 'S') {
            this.descending = true;
            if (speedControl1 > 0) {
                speedControl1 -= 0.004;
            }
            if (speedControl2 > 0) {
                speedControl2 -= 0.004;
            }
            if (speedControl3 > 0) {
                speedControl3 -= 0.004;
            }
            if (speedControl4 > 0) {
                speedControl4 -= 0.004;
            }
        } else if (direction === 'W') {
            if (speedControl1 <= 0.35) {
                speedControl1 += 0.005;
            }
            if (speedControl4 <= 0.35) {
                speedControl4 += 0.005;
            }
            speedControl2 = initialSpeed;
            speedControl3 = initialSpeed;
        } else if (direction === 'E') {
            if (speedControl2 <= 0.35) {
                speedControl2 += 0.005;
            }
            if (speedControl3 <= 0.35) {
                speedControl3 += 0.005;
            }
            speedControl1 = initialSpeed;
            speedControl4 = initialSpeed;

        }
    }

    this.backToCenter = function (direction) {

        speedControl1 = initialSpeed;
        speedControl4 = initialSpeed;
        speedControl2 = initialSpeed;
        speedControl3 = initialSpeed;
    }

    this.changeSpeedR = function (direction) {

        if (direction === 'N' || direction === 'NE') {
            console.log('hereN');
            if (speedControl3 <= 0.35) {
                speedControl3 += 0.005;
            }
            if (speedControl4 <= 0.35) {
                speedControl4 += 0.005;
            }
            speedControl1 = initialSpeed;
            speedControl2 = initialSpeed;

        } else if (direction === 'S') {
            console.log('hereS');

            if (speedControl1 <= 0.35) {
                speedControl1 += 0.005;
            }
            if (speedControl2 <= 0.35) {
                speedControl2 += 0.005;
            }
            speedControl3 = initialSpeed;
            speedControl4 = initialSpeed;

        } else if (direction === 'W') {
            console.log('hereW');

            if (speedControl2 <= 0.35) {
                speedControl2 += 0.005;
                console.log('hereW2');
                console.log('speedcon2af' + speedControl2);

            }
            if (speedControl4 <= 0.35) {
                speedControl4 += 0.005;
            }
            speedControl1 = initialSpeed;
            speedControl3 = initialSpeed;
        } else if (direction === 'E') {
            console.log('hereE');

            if (speedControl1 <= 0.35) {
                speedControl1 += 0.005;
            }
            if (speedControl3 <= 0.35) {
                speedControl3 += 0.005;
            }
            speedControl2 = initialSpeed;
            speedControl4 = initialSpeed;
        } else {
            console.log('hereHHHH');
            return;
        }
    }

}

function calculateOrigin() {

    let width = canvas2.width;
    let height = canvas2.height;

    //calculating suitable radius
    let radius = (0.02 * width) / 2
    if (height < width) {
        radius = (0.02 * height) / 2;
    }
    //length of the propeller
    return [width, height, radius];
}

function calculateBodyPosition() { //this function returns the mid point of the body and x1,y1, side length
    let width = canvas2.width;
    let height = canvas2.height;

    let side = 0.5 * width;
    if (height < width) {
        side = 0.5 * height;
    }
    let xMid = infoArray[0] * 0.5;
    let yMid = infoArray[1] * 0.4;
    let x1 = xMid - side / 2;
    let y1 = yMid - side / 2;
    return [xMid, yMid, x1, y1, side];
}

function drawStatic() {

    //calculate drone body size
    let postionArray = calculateBodyPosition();
    let xMid = postionArray[0];
    let yMid = postionArray[1];
    let x1 = postionArray[2];
    let y1 = postionArray[3];
    let side = postionArray[4];

    c.beginPath();
    c.arc(x1, y1, infoArray[2] * 3, 0, 0.5 * Math.PI, true);
    c.lineTo(x1 + side - infoArray[2] * 3, y1 + side);
    c.arc(x1 + side, y1 + side, infoArray[2] * 3, Math.PI, 1.5 * Math.PI, true);
    c.closePath();
    let gradientLine1 = c.createLinearGradient(x1, y1, x1 + 420, y1 + 420);
    gradientLine1.addColorStop(0, '#8d8d8d');
    gradientLine1.addColorStop(0.5, '#b0aeae');
    gradientLine1.addColorStop(1, '#8d8d8d');

    c.stroke();
    c.fillStyle = gradientLine1;
    c.fill();

    //3to2
    c.beginPath();
    c.arc(x1, y1 + side, infoArray[2] * 3, 0, 3 / 2 * Math.PI, false);
    c.lineTo(x1 + side - infoArray[2] * 3, y1);
    c.arc(x1 + side, y1, infoArray[2] * 3, Math.PI, 0.5 * Math.PI, false);
    c.closePath();
    c.stroke();
    c.fill();


    //middle body
    c.beginPath();
    c.arc(xMid, yMid, infoArray[2] * 15, 0, 2 * Math.PI, true);
    let gradient = c.createRadialGradient(xMid, yMid, infoArray[2] * 1, xMid, yMid, infoArray[2] * 15);
    gradient.addColorStop(1, '#696969');
    gradient.addColorStop(0, '#b0aeae');
    c.fillStyle = gradient;
    c.fill();
}

function init() {
    inited = true;
    joyLeft.drawOuterCircle();
    joyLeft.drawInnerCircle(joyLeft.centerXJ, joyLeft.centerYJ);
    joyRight.drawOuterCircle();
    joyRight.drawInnerCircle(joyRight.centerXJ, joyRight.centerYJ);
    window.requestAnimationFrame(animate);
}


function drawingPropeller() {
    c.save();
    for (let i = 1; i < 3; i++) {
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(-infoArray[2], infoArray[2] * 7);
        c.lineTo(infoArray[2] * 1.5, infoArray[2] * 17);
        c.lineTo(infoArray[2] * 3, infoArray[2] * 17);
        c.lineTo(infoArray[2] + infoArray[2] * 3, infoArray[2] * 7);
        c.lineTo(infoArray[2] * 0.5, 0);
        c.closePath();
        c.fill();
        c.rotate(Math.PI);
    }

    c.restore();
    c.beginPath();
    c.arc(0, 0, infoArray[2] * 1.5, 0, Math.PI * 2.5, false);
    c.fillStyle = '#404040';
    c.fill();

    c.beginPath();
    c.arc(0, 0, infoArray[2] * 1, 0, Math.PI * 2.5, false);
    c.fillStyle = '#b0aeae';
    c.fill();
}

function animate() {
    reposition();
    angle1 += speedControl1;
    angle4 += speedControl4;
    angle2 -= speedControl2;
    angle3 -= speedControl3;
    requestAnimationFrame(animate);
}