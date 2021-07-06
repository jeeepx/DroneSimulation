temp.js
var canvas2 = document.getElementById('canvas2');
var c = canvas2.getContext('2d');

var joyLCanvas = document.getElementById('joyL');
var jL = canvas2.getContext('2d');
//sizing canvas
canvas2.width = window.innerWidth * 0.5;
canvas2.height = window.innerHeight*0.5;
joyLCanvas.width = window.innerWidth * 0.25;
joyLCanvas.height = window.innerHeight*0.5;

if (window.innerWidth < 991) {
    canvas2.width = window.innerWidth;
    canvas2.height = 0.25 * window.innerHeight;
}


//resizing canvas

window.addEventListener('resize', function () {

    canvas2.width = window.innerWidth * 0.5;
    canvas2.height = window.innerHeight * 0.5;
    //canvas2.width = window.innerWidth*0.5;
    //canvas2.height = window.innerHeight*0.5;
    //console.log(window.innerWidth);

    // if (window.innerWidth < 991) {
    //     canvas2.width = window.innerWidth;
    //     canvas2.height = 0.5 * window.innerHeight;
    //     //canvas2.width = window.innerWidth;
    //     //canvas2.height = 0.5*window.innerHeight;
    // }
    reposition();
});
var infoArray = calculateOrigin()
var joyLeft = new JoyStick(0.375 * infoArray[0], 0.85 * infoArray[1], 5 * infoArray[2], true);
var joyRight = new JoyStick(0.625 * infoArray[0], 0.85 * infoArray[1], 5 * infoArray[2], false);

joyLCanvas.addEventListener('mousedown', function (event) {
    //console.log('listend');
    joyLeft.startDrawing(event);
    joyRight.startDrawing(event);
    console.log('listend down');
});
joyLCanvas.addEventListener('mousemove', function (event) {
    //console.log('listend');
    if(pressedL){
        joyLeft.dragDraw(event);
    }else {
        joyRight.dragDraw(event);
    }
    
    console.log('listend drag');
});
joyLCanvas.addEventListener('mouseup', function (event) {
    //console.log('listend');
    joyLeft.stopDrawing(event);
    joyRight.stopDrawing(event);
    //console.log('listend');

});

var inited = false;
var initialSpeed = 0.045;
var angle1 = 0.005;
var angle2 = 0.005;
var angle3 = 0.005;
var angle4 = 0.005;
var speedControl1 = initialSpeed;
var speedControl4 = initialSpeed;
var speedControl2 = initialSpeed;
var speedControl3 = initialSpeed;
var infoArray = [];
var pressedL = false;
var pressedR = false;
init();
function isInWhichCircle(){

}

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



    this.drawOuterCircle = function () {

        jL.beginPath();
        jL.arc(this.centerXJ, this.centerYJ, this.radiusJ, 0, Math.PI * 2, false);
        jL.fillStyle = 'black';
        jL.fill();
        //console.log('drew Outer Circle');

    }

    this.drawInnerCircle = function (x, y) {

        jL.beginPath();
        jL.arc(x, y, this.radiusJ * 0.5, 0, Math.PI * 2, false);
        jL.fillStyle = 'lightpink';
        jL.fill();
        //console.log('drew Inner Circle');
    }

    this.startDrawing = function (event) {

        this.calculateCanvasPosition(event);
        if (this.isInBigCircle()) {
            if (this.left === true) {
                jL.clearRect(0, canvas2.height * 0.6 + 100, canvas2.width * 0.5, canvas2.height);
            } else {
                jL.clearRect(canvas2.width * 0.5, canvas2.height * 0.6 + 100, canvas2.width, canvas2.height);
            }

            console.log('clear');
            console.log('x:' + this.newCirX);
            console.log('y:' + this.newCirY);

            this.drawOuterCircle();
            this.drawInnerCircle(this.newCirX, this.newCirY);
        } else {
            console.log('not in ');
        }
        if (this.left){
            pressedL = true;
            pressR = false;
        }
        else {
            pressedR = true;
            pressedL =false;
        }

    }

    this.dragDraw = function (event) {
        if (pressedL||pressedR) {
            this.calculateCanvasPosition(event);
            if (this.isInBigCircle()) {
                if (this.left === true) {
                    c.clearRect(0, canvas2.height * 0.6 + 100, canvas2.width * 0.5, canvas2.height);
                } else {
                    c.clearRect(canvas2.width * 0.5, canvas2.height * 0.6 + 100, canvas2.width, canvas2.height);
                }
                console.log('clear drag');
                console.log('x:' + this.newCirX);
                console.log('y:' + this.newCirY);
                this.drawOuterCircle();
                this.drawInnerCircle(this.newCirX, this.newCirY);
                var angle = this.calculateAngle(event);
                //this.calculateCoordinate(angle);
                this.direction = this.getDirection(angle);
                if (this.left === true) {
                    this.changeSpeedL(this.direction);
                }
            } else {
                console.log('not in drag');
                if (this.left === true) {
                    c.clearRect(0, canvas2.height * 0.6 + 100, canvas2.width * 0.5, canvas2.height);
                } else {
                    c.clearRect(canvas2.width * 0.5, canvas2.height * 0.6 + 100, canvas2.width, canvas2.height);
                }
                var angle = this.calculateAngle(event);
                this.calculateCoordinate(angle);
                this.drawOuterCircle();
                this.drawInnerCircle(this.newCirX, this.newCirY);
                this.direction = this.getDirection(angle);
                if (this.left === true) {
                    this.changeSpeedL(this.direction);
                }


            }
        }
    }


    this.stopDrawing = function (event) {
        pressedL=false;
        pressedR=false;
        if (this.left === true) {
            jL.clearRect(0, joyLCanvas.height * 0.6 + 100, joyLCanvas.width * 0.5, joyLCanvas.height);
        } else {
            jL.clearRect(joyLCanvas.width * 0.5, joyLCanvas.height * 0.6 + 100, joyLCanvas.width, canvas2.height);
        }
        console.log('clear');
        this.calculateCanvasPosition(event);
        console.log(this.isInBigCircle());



        this.drawOuterCircle();
        this.drawInnerCircle(this.centerXJ, this.centerYJ);
        this.backToCenter(this.direction);


    }
    this.calculateCanvasPosition = function (event) {
        this.clickedX = event.clientX;
        console.log('x1:' + this.clickedX);

        this.clickedY = event.clientY;
        console.log('y1:' + this.clickedY);
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
            if (speedControl1 >= 0) {
                speedControl1 -= 0.005;
            }
            if (speedControl2 > 0) {
                speedControl2 -= 0.005;
            }
            if (speedControl3 > 0) {
                speedControl3 -= 0.005;
            }
            if (speedControl4 > 0) {
                speedControl4 -= 0.005;
            }
        } else if (direction === 'W') {
            if (speedControl1 <= 0.35) {
                speedControl1 += 0.005;
            }
            if (speedControl4 <= 0.35) {
                speedControl4 += 0.005;
            }
        } else if (direction === 'E') {
            if (speedControl2 <= 0.35) {
                speedControl2 += 0.005;
            }
            if (speedControl3 <= 0.35) {
                speedControl3 += 0.005;
            }
        }
    }

    this.backToCenter = function (direction) {
        if (left && direction === 'N' || direction === 'S') {
            return;
        }
        speedControl1 = initialSpeed;
        speedControl4 = initialSpeed;
        speedControl2 = initialSpeed;
        speedControl3 = initialSpeed;
    }


}













function calculateOrigin() {

    var width = canvas2.width;
    var height = canvas2.height;

    //calculating suitable radius
    var radius = (0.02 * width) / 2
    if (height < width) {
        radius = (0.02 * height) / 2;
    }
    //length of the propeller
    return [width, height, radius];
}

function drawStatic() {
    c.beginPath();
    c.moveTo(infoArray[0] * 0.25, infoArray[1] * 0.125);
    c.lineTo(infoArray[0] * 0.75, infoArray[1] * 0.6);
    c.lineTo(infoArray[0] * 0.75 - 5, infoArray[1] * 0.6 + 5);
    c.lineTo(infoArray[0] * 0.25 - 5, infoArray[1] * 0.125 + 5);
    c.fill();

    c.beginPath();
    c.moveTo(infoArray[0] * 0.25, infoArray[1] * 0.6);
    c.lineTo(infoArray[0] * 0.75, infoArray[1] * 0.125);
    c.lineTo(infoArray[0] * 0.75 + 5, infoArray[1] * 0.125 + 5);
    c.lineTo(infoArray[0] * 0.25 + 5, infoArray[1] * 0.6 + 5);
    c.fill();

    c.beginPath();
    c.arc(infoArray[0] * 0.5, infoArray[1] * 0.375, infoArray[2] * 10, 0, 2 * Math.PI, false);
    c.fill();



}

function reposition() {
    infoArray = calculateOrigin(); //finding center
    //set center to origin

    c.clearRect(0, 0, canvas2.width, canvas2.height * 0.6 + 100);
    //draw box and lines
    drawStatic();

    c.save();
    c.translate(infoArray[0] * 0.25, infoArray[1] * 0.125);
    c.rotate(angle1);
    drawingRandomShit();
    c.restore();

    c.save();
    c.translate(infoArray[0] * 0.75, infoArray[1] * 0.6);
    c.rotate(angle4);
    drawingRandomShit();
    c.restore();


    c.save();
    c.translate(infoArray[0] * 0.75, infoArray[1] * 0.125);
    c.rotate(angle2);
    drawingRandomShit();
    c.restore();

    c.save();
    c.translate(infoArray[0] * 0.25, infoArray[1] * 0.6);
    c.rotate(angle3);
    drawingRandomShit();
    c.restore();
}



function init() {
    inited = true;

    joyLeft.drawOuterCircle();
    joyLeft.drawInnerCircle(joyLeft.centerXJ, joyLeft.centerYJ);
    joyRight.drawOuterCircle();
    joyRight.drawInnerCircle(joyRight.centerXJ, joyRight.centerYJ);
    window.requestAnimationFrame(animate);
}

function drawingRandomShit() {
    c.save();
    c.beginPath();
    c.arc(0, 0, 10, 0, Math.PI * 2, false);
    c.fill();
    c.moveTo(0, 0);
    c.lineTo(0, 50);
    c.lineTo(50, 80);
    c.fill();

    c.rotate(Math.PI);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, 50);
    c.lineTo(50, 80);
    c.moveTo(0, 0);

    c.fill();
    c.restore();
}


function animate() {
    reposition();
    angle1 += speedControl1;
    angle4 += speedControl4;

    angle2 -= speedControl2;
    angle3 -= speedControl3;


    requestAnimationFrame(animate);
}

function speedChange(propellerNo, factor) {
    if (propellerNo === 1) {
        speedControl1 += factor;
    } else if (propellerNo === 4) {
        speedControl4 += factor;
    } else if (propellerNo === 2) {
        speedControl2 += factor;
    } else if (propellerNo === 3) {
        speedControl3 += factor;
    }

}