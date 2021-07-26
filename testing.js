const actionCanvas = document.getElementById("action");
console.log(actionCanvas);
const c1 = actionCanvas.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const c = canvas2.getContext('2d');
const navBar = document.getElementById('navbar');
const nav = navBar.getBoundingClientRect()
const navBarHeight = nav.height;
const canvas3 = document.getElementById('joyStick');
const c3 = canvas3.getContext('2d');
const canvas1 = document.querySelector(".webgl")
const actionCanvasBg = document.getElementById("action-background");
const c0 = actionCanvasBg.getContext('2d');

import * as THREE from './three.js-master/build/three.module.js'
import {
    GLTFLoader
} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
const loader = new GLTFLoader()
var drone;
var pivot = new THREE.Group();
var box = new THREE.Box3();

const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(40);
scene.background = new THREE.Color(0xcaf1ff);


loader.load('file-1592658408798.glb', (glb) => {
        drone = glb.scene;
        drone.scale.set(15, 15, 15);
        drone.position.set(0, 1, 0)
        scene.add(drone)
        //console.log(drone);
        box.setFromObject(drone);
        box.getCenter(drone.position);
        drone.position.multiplyScalar(-1);
        scene.add(pivot);
        pivot.add(drone);
        renderer.render(scene, camera)
    },

    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "%loaded")
    },
    function (error) {
        console.log('An error occurred')
    })

const light = new THREE.DirectionalLight(0xffffff, 5)
scene.add(light)

const light2 = new THREE.DirectionalLight(0xffffff, 3)
light2.position.set(0, -1, 15)
scene.add(light2)

const light3 = new THREE.AmbientLight(0xffffff, 2.5)
scene.add(light3)

//helper
// const DirectionHelper = new THREE.DirectionalLightHelper(light, 0.2);
// scene.add(DirectionHelper)
// const DirectionHelper1 = new THREE.DirectionalLightHelper(light2, 0.2);
// scene.add(DirectionHelper1)


const canvas = document.querySelector(".webgl")
const sizes = {
    width: window.innerWidth * 0.5,
    height: window.innerHeight - navBarHeight
}

if (window.innerWidth < 992) {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight * 0.5 - navBarHeight * 0.5
}

//sizing canvas
actionCanvasBg.style.background = "#fff1c3";
canvas3.style.width = sizes.width + "px";
canvas3.style.height = sizes.height + "px";
canvas2.style.width = sizes.width + "px";
canvas2.style.height = sizes.height + "px";
actionCanvas.style.width = sizes.width + "px";
actionCanvas.style.height = sizes.height * 0.35 + "px";
actionCanvasBg.style.width = sizes.width + "px";
actionCanvasBg.style.height = sizes.height * 0.35 + "px";
// console.log(canvas3.style.width);
// console.log(canvas3.style.height);

var scale = window.devicePixelRatio;
canvas3.width = sizes.width * scale;
canvas3.height = sizes.height * scale;
canvas2.width = sizes.width * scale;
canvas2.height = sizes.height * scale;
actionCanvas.width = sizes.width * scale;;
actionCanvas.height = sizes.height * scale * 0.35;
actionCanvasBg.width = sizes.width * scale;;
actionCanvasBg.height = sizes.height * scale * 0.35;

window.addEventListener('resize', function () {
    //update camera
    sizes.width = window.innerWidth * 0.5;
    sizes.height = window.innerHeight - navBarHeight;

    if (window.innerWidth < 992) {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight * 0.5 - navBarHeight * 0.5
    }

    //sizing canvas

    canvas3.style.width = sizes.width + "px";
    canvas3.style.height = sizes.height + "px";
    canvas2.style.width = sizes.width + "px";
    canvas2.style.height = sizes.height + "px";
    actionCanvas.style.width = sizes.width + "px";
    actionCanvas.style.height = sizes.height * 0.35 + "px";
    actionCanvasBg.style.width = sizes.width + "px";
    actionCanvasBg.style.height = sizes.height * 0.35 + "px";

    let scale = window.devicePixelRatio;
    canvas3.width = sizes.width * scale;
    canvas3.height = sizes.height * scale;
    canvas2.width = sizes.width * scale;
    canvas2.height = sizes.height * scale;
    actionCanvas.width = sizes.width * scale;
    actionCanvas.height = sizes.height * scale * 0.35;
    actionCanvasBg.width = sizes.width * scale;
    actionCanvasBg.height = sizes.height * scale * 0.35;

    camera.aspect = sizes.width / (sizes.height * 0.65);
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height * 0.65) //update renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    //console.log(window.devicePixelRatio);
    infoArray = calculateOrigin();
    repositionJoy();
    reposition();
    drawSpeedBar([50, 50, 50, 50]);
    writePercentage([50, 50, 50, 50]);
    drawCanvasBackground();
    drawActionCircles([50, 50, 50, 50]);

});


const camera = new THREE.PerspectiveCamera(75, sizes.width / (sizes.height * 0.65), 0.1, 100)
camera.position.set(0, 0, 8)
scene.add(camera)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height * 0.65)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate1() {
    requestAnimationFrame(animate1)
    renderer.render(scene, camera)

}
//animate1()

var pause = false;

function animation3D() {
    if (!pause) {
        requestAnimationFrame(animation3D);
        if (drone) {
            // console.log(pivot.position);
            pivot.position.y += storedLLRR[0] / 1000;
            pivot.translateX(-storedLLRR[1] / 1000);
            pivot.translateZ(-storedLLRR[2] / 1000);
            pivot.rotateY(-storedLLRR[3] / 1000);
        }
        renderer.render(scene, camera)
    }
}

function drawCanvasBackground() {
    c0.clearRect(0, 0, actionCanvasBg.width, actionCanvasBg.height);
    let radius = actionCanvasBg.width * 0.08
    if (actionCanvasBg.height < actionCanvas.width) {
        radius = actionCanvasBg.height * 0.3
    }
    let y = actionCanvasBg.height * 0.6;

    let x = actionCanvasBg.width / 12

    c0.strokeStyle = '#add3ff';
    c0.lineWidth = 8;
    c0.fillStyle = '#FFFFFF';

    c0.beginPath();
    c0.arc(3 * x, y, radius, 0, Math.PI * 2, true);
    c0.stroke();
    c0.fill();

    c0.beginPath();
    c0.arc(6 * x, y, radius, 0, Math.PI * 2, true);
    c0.stroke();
    c0.fill();


    c0.beginPath();
    c0.arc(9 * x, y, radius, 0, Math.PI * 2, true);
    c0.stroke();
    c0.fill();




    let topView = new Image();
    let backView = new Image();
    let sideView = new Image();

    backView.onload = function () {
        let fontSize = Math.floor(0.38 * actionCanvas.width / 35);
        let fontFillStyle = fontSize + "px Poppins";
        c0.font = fontFillStyle;
        c0.drawImage(backView, 3 * x - radius * 0.35, y - radius * 0.5, radius * 0.9, radius * 0.85);
        c0.fillText('FRONT', 3 * x - radius * 0.1, y - radius * 0.35);
    };
    backView.src = './img/backView1.png';

    sideView.onload = function () {
        let fontSize = Math.floor(0.38 * actionCanvas.width / 35);
        let fontFillStyle = fontSize + "px Poppins";
        c0.font = fontFillStyle;
        c0.drawImage(sideView, 6 * x - radius * 0.45, y - radius * 0.5, radius * 0.9, radius * 0.85);
        c0.save();
        c0.translate(6 * x + radius * 0.55, y - radius * 0.15);
        c0.rotate(Math.PI * 0.5)
        c0.fillText('FRONT', 0, 0);
        c0.restore();


    };
    sideView.src = './img/sideView.png';

    topView.onload = function () {
        let fontSize = Math.floor(0.38 * actionCanvas.width / 35);
        let fontFillStyle = fontSize + "px Poppins";
        c0.font = fontFillStyle;
        c0.drawImage(topView, 9 * x - radius * 0.425, y - radius * 0.45, radius * 0.9, radius * 0.85);
        c0.fillText('FRONT', 9 * x - radius * 0.10, y - radius * 0.35);

    };
    topView.src = './img/topView.png';

    let fontSize = Math.floor(0.38 * actionCanvas.width / 25);
    let fontFillStyle = fontSize + "px Poppins";
    c0.font = fontFillStyle;
    c0.fillStyle = '#000000';
    c0.fillText('BACK VIEW', 3 * x - radius * 0.5, actionCanvasBg.height * 0.18);
    c0.fillText('SIDE VIEW', 6 * x - radius * 0.5, actionCanvasBg.height * 0.18);
    c0.fillText('TOP VIEW', 9 * x - radius * 0.5, actionCanvasBg.height * 0.18);



}


c0.stroke();
//show direction stuff
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}


function drawActionCircles(speedArray) {
    // console.log(speedArray);
    c1.clearRect(0, 0, actionCanvas.width, actionCanvas.height);

    if (!arraysEqual(speedArray, [50, 50, 50, 50])) {
        drawArrow(storedLLRR, 1);
        drawArrow(storedLLRR, 2);
        drawArrow(storedLLRR, 3);

        drawCurveArrow();

    }
}

function calAngleAction(x, y) {
    if (-0.05 <= x && x <= 0.05 && -0.05 <= y && y <= 0.05) {
        return 500;
    }
    console.log('deg:' + Math.atan2(y, x) * 180 / Math.PI);
    return Math.atan2(y, x)
}

function drawArrow(uiArray, number) {
    let y = actionCanvasBg.height * 0.6;
    let x = actionCanvasBg.width / 12
    //first pic
    if (number === 1) {
        let angle1 = calAngleAction(uiArray[1], uiArray[0] * -1);
        if (angle1 !== 500) {
            c1.save();
            c1.translate(3 * x, y);
            c1.beginPath();
            // c1.arc(0, 0, 3, 0, Math.PI * 2, true);
            c1.stroke();
            c1.rotate(angle1);
            drawArrowHelper();
            c1.restore();
        }

    } else if (number === 2) {
        let angle2 = calAngleAction(uiArray[2] * -1, uiArray[0] * -1);
        if (angle2 != 500) {
            c1.save();
            c1.translate(6 * x, y);
            c1.beginPath();
            // c1.arc(0, 0, 3, 0, Math.PI * 2, true);
            c1.stroke();
            c1.rotate(angle2);
            drawArrowHelper();
            c1.restore();
        }

    } else if (number === 3) {
        let angle3 = calAngleAction(uiArray[1], uiArray[2]);
        if (angle3 != 500) {
            c1.save();
            c1.translate(9 * x, y);
            c1.beginPath();
            // c1.arc(0, 0, 3, 0, Math.PI * 2, true);
            c1.stroke();
            c1.rotate(angle3);
            drawArrowHelper();
            c1.restore();
        }

    }
}

function drawArrowHelper() {
    let xStart = actionCanvas.width * 0.04;
    let yStart = -actionCanvas.width * 0.004;
    c1.beginPath();
    c1.moveTo(xStart, yStart);
    c1.lineTo(xStart + actionCanvas.width * 0.03, yStart)
    c1.lineTo(xStart + actionCanvas.width * 0.03, yStart - actionCanvas.width * 0.006);
    c1.lineTo(xStart + actionCanvas.width * 0.05, yStart + actionCanvas.width * 0.0035);
    c1.lineTo(xStart + actionCanvas.width * 0.03, yStart + 2 * actionCanvas.width * 0.006);
    c1.lineTo(xStart + actionCanvas.width * 0.03, yStart + actionCanvas.width * 0.006);
    c1.lineTo(xStart, yStart + actionCanvas.width * 0.006);
    c1.closePath();
    c1.fillStyle = '#add3ff';
    c1.fill();





}


function drawCurveArrow() {
    let x = actionCanvasBg.width / 12
    let y1 = actionCanvasBg.height * 0.4;
    let radius = actionCanvasBg.width * 0.08

 
   

    let curveArrow = new Image();
    if(storedLLRR[3]>0.05){
        curveArrow.onload = function () {
            c1.drawImage(curveArrow, 10.25 * x, y1, radius * 0.5, radius);
            
        };
        curveArrow.src = './img/rightArrow.png';
    } else if(storedLLRR[3]<-0.05){
        curveArrow.onload = function () {
            c1.drawImage(curveArrow, 7.25 * x, y1, radius * 0.5, radius);
            
        };
        curveArrow.src = './img/leftLongArrow.png';

    }

  
}


//resizing canvas associated function
function reposition() {
    infoArray = calculateOrigin(); //finding center
    c.clearRect(0, 0, canvas2.width, canvas2.height);
    //draw box and lines
    drawStatic();
    let postionArray = calculateBodyPosition();
    let x1 = postionArray[2];
    let y1 = postionArray[3];
    let side = postionArray[4]; //drawing propellers start
    c.save();
    c.translate(x1, y1);
    c.rotate(angle1);
    drawingPropeller(1); //actually draw propeller
    c.restore();

    c.save();
    c.translate(x1 + side, y1 + side);
    c.rotate(angle4);
    drawingPropeller(2);
    c.restore();

    c.save();
    c.translate(x1 + side, y1);
    c.rotate(angle2);
    drawingPropeller(3);
    c.restore();

    c.save();
    c.translate(x1, y1 + side);
    c.rotate(angle3);
    drawingPropeller(4);
    c.restore();
}

function repositionJoy() {
    //console.log('reposition!!!!!! JOY');
    infoArray = calculateOrigin();
    let postionArray = calculateBodyPosition();
    let x1 = postionArray[2];
    let side = postionArray[4];
    joyLeft.centerXJ = x1;
    console.log(joyLeft.centerXJ);
    joyLeft.centerYJ = 0.925 * infoArray[1];
    joyRight.centerXJ = x1 + side;
    joyRight.centerYJ = 0.925 * infoArray[1];
    joyLeft.radiusJ = 6 * infoArray[2];
    joyRight.radiusJ = 6 * infoArray[2];

    c3.clearRect(0, 0, canvas2.width, canvas2.height);
    joyLeft.drawOuterCircle();
    joyLeft.drawPath();
    joyLeft.drawInnerCircle(x1, 0.925 * infoArray[1]);
    joyRight.drawOuterCircle();
    joyRight.drawPath();
    joyRight.drawInnerCircle(x1 + side, 0.925 * infoArray[1]);
}


let infoArray = calculateOrigin()
let postionArray = calculateBodyPosition();
let x1 = postionArray[2];
let side = postionArray[4];
let joyLeft = new JoyStick(x1, 0.92 * infoArray[1], 6 * infoArray[2], true);
let joyRight = new JoyStick(x1 + side, 0.92 * infoArray[1], 6 * infoArray[2], false);
let lastTap = 0;


canvas3.addEventListener('mousedown', function (event) {
    if (isInLCircle(event)) {
        joyLeft.startDrawing(event);
    } else if (isInRCircle(event)) {
        joyRight.startDrawing(event);
    }
});
canvas3.addEventListener('mousemove', function (event) {
    if (isInLCircle(event)) {
        joyLeft.dragDraw(event);
    } else if (isInRCircle(event)) {
        joyRight.dragDraw(event);
    }
});
canvas3.addEventListener('mouseup', function (event) {
    if ((isInLCircle(event))) {
        joyLeft.stopDrawing(event);
    } else if (isInRCircle(event)) {
        joyRight.stopDrawing(event);
    } else {
        joyLeft.stopDrawing(event);
        joyRight.stopDrawing(event);
    }
});
canvas3.addEventListener('dblclick', function (event) {

    if (isInLCircle(event)) {
        joyLeft.drawLockedRing(event);
    } else if (isInRCircle(event)) {
        joyRight.drawLockedRing(event);
    }
})
let touchCoor; 

canvas3.addEventListener('touchstart', function (event) {
    touched = true;
    touchCoor = event.touches[0];

    let timeNow = new Date().getTime();

    let timesince = timeNow - lastTap;
    console.log('here in touch start')

    if ((timesince < 600) && (timesince > 0)) {
        if (isInLCircle(event)) {
            joyLeft.drawLockedRing(event);
            //event.preventDefault();

        } else if (isInRCircle(event)) {
            joyRight.drawLockedRing(event);
            // console.log('add dont move')
        }

    } else {
        joyLeft.startDrawing(event);
        joyRight.startDrawing(event);
       
    }
     lastTap = new Date().getTime();

});
canvas3.addEventListener('touchmove', function (event) {
    touchCoor = event.touches[0];
    joyLeft.dragDraw(event);
    joyRight.dragDraw(event);
   
});
canvas3.addEventListener('touchend', function (event) {
    joyLeft.stopDrawing(event);
    joyRight.stopDrawing(event);
    touched = false;
 
});

var inited = false;
var initialSpeed = 0.2;
var angle1 = 0.005;
var angle2 = 0.005;
var angle3 = 0.005;
var angle4 = 0.005;
var speedControl1 = initialSpeed;
var speedControl4 = initialSpeed;
var speedControl2 = initialSpeed;
var speedControl3 = initialSpeed;
var touched = false;
let storedLX = 0;
let storedLY = 0;
let storedRX = 0;
let storedRY = 0;
let holdLeft = false;
let holdRight = false;
let pressedL = false;
let pressedR = false;
let storedLLRR = [];



init();

function isInLCircle(event) {
    joyLeft.calculateCanvasPosition(event);
    return joyLeft.isInBigCircle();
}

function isInRCircle(event) {
    joyRight.calculateCanvasPosition(event);
    return joyRight.isInBigCircle();
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
    this.oldDirection = '';
    this.doubleClicked = false;
    this.calculatedSpeedArray = [];
    this.oldXcoor;

    this.drawOuterCircle = function () {
        c3.beginPath();
        c3.arc(this.centerXJ, this.centerYJ, this.radiusJ, 0, Math.PI * 2, false);
        let gradient = c3.createRadialGradient(this.centerXJ, this.centerYJ, this.radiusJ * 0.45, this.centerXJ, this.centerYJ, this.radiusJ);
        gradient.addColorStop(0, '#96948F');
        gradient.addColorStop(1, '#B0AFAA');
        c3.fillStyle = '#696969';
        c3.fill();
        //console.log('drew Outer Circle Joy');
    }

    this.drawInnerCircle = function (x, y) {
        c3.beginPath();
        c3.arc(x, y, this.radiusJ * 0.4, 0, Math.PI * 2, false);
        let gradient = c3.createRadialGradient(this.centerXJ, this.centerYJ, this.radiusJ * 0.15, this.centerXJ, this.centerYJ, this.radiusJ * 0.45);
        gradient.addColorStop(0, '#E8E6E1');
        gradient.addColorStop(1, '#A39E93');
        c3.fillStyle = gradient;
        c3.fill();
        //console.log('drew Inner Circle Joy');
    }
    this.drawLockedRing = (event) => {
        // console.log('left or not: ' + this.left);
        // console.log(centerXJ + ', before before' + centerYJ);
        this.calculateCanvasPosition(event);
        // console.log(this.centerXJ + ', before' + this.centerYJ);
        let calculatedArray = this.mapPosition(this.newCirX, this.newCirY);
        //console.log(calculatedArray);
        if (this.isInBigCircle()) {
            pause = false;
            if (this.left && !holdRight) {
                holdLeft = true;
                storedLX = calculatedArray[0];
                storedLY = calculatedArray[1];
                storedRX = 0;
                storedRY = 0;
                console.log('left ' + holdLeft);
            } else if (this.left && holdRight) {
                holdLeft = true;
                storedLX = calculatedArray[0];
                storedLY = calculatedArray[1];
            } else if (!this.left && !holdLeft) {
                holdRight = true;
                storedRX = calculatedArray[0];
                storedRY = calculatedArray[1];
                storedLX = 0;
                storedLY = 0;
                console.log('right ' + holdRight);
            } else {
                holdRight = true;
                storedRX = calculatedArray[0];
                storedRY = calculatedArray[1];
            }

            this.drawOuterCircle();
            this.drawPath();
            c3.beginPath();
            c3.arc(this.newCirX, this.newCirY, this.radiusJ * 0.45, 0, Math.PI * 2, false);
            let gradient = c3.createRadialGradient(this.centerXJ, this.centerYJ, this.radiusJ * 0.15, this.centerXJ, this.centerYJ, this.radiusJ * 0.45);
            gradient.addColorStop(0, '#E8E6E1');
            gradient.addColorStop(1, '#A39E93');
            c3.fillStyle = gradient;
            c3.fill();

            this.createUiArray();
            animation3D();
            this.calculatedSpeedArray = this.matrixMultiplication();
            drawActionCircles(this.calculatedSpeedArray);
            let rearrangedArray = this.rearrangedArray();
            drawSpeedometer(rearrangedArray);
            drawSpeedBar(rearrangedArray);
            adjustSpeed(this.calculatedSpeedArray);
            writePercentage(rearrangedArray);
            writeDescription(storedLLRR);

        }
    }
    this.drawPath = function () {
        c3.beginPath();
        c3.moveTo(this.centerXJ - this.radiusJ + this.radiusJ * 0.3, this.centerYJ + this.radiusJ * 0.45 - this.radiusJ * 0.3);
        c3.lineTo(this.centerXJ + this.radiusJ - this.radiusJ * 0.3, this.centerYJ + this.radiusJ * 0.45 - this.radiusJ * 0.3);
        c3.lineTo(this.centerXJ + this.radiusJ - this.radiusJ * 0.3, this.centerYJ - this.radiusJ * 0.45 + this.radiusJ * 0.3);
        c3.lineTo(this.centerXJ - this.radiusJ + this.radiusJ * 0.3, this.centerYJ - this.radiusJ * 0.45 + this.radiusJ * 0.3);
        c3.closePath();
        let gradient = c3.createLinearGradient(this.centerXJ - this.radiusJ + this.radiusJ * 0.3, this.centerYJ + this.radiusJ * 0.45 - this.radiusJ * 0.3, this.centerXJ + this.radiusJ - this.radiusJ * 0.3, this.centerYJ - this.radiusJ * 0.45 + this.radiusJ * 0.3);
        gradient.addColorStop(0, '#E8E6E1');
        gradient.addColorStop(1, '#A39E93');
        c3.fillStyle = gradient;
        c3.fill();

        c3.moveTo(this.centerXJ - this.radiusJ * 0.15, this.centerYJ - this.radiusJ * 0.7);
        c3.lineTo(this.centerXJ + this.radiusJ * 0.15, this.centerYJ - this.radiusJ * 0.7);
        c3.lineTo(this.centerXJ + this.radiusJ * 0.15, this.centerYJ + this.radiusJ * 0.7);
        c3.lineTo(this.centerXJ - this.radiusJ * 0.15, this.centerYJ + this.radiusJ * 0.7);
        c3.closePath();
        c3.fill();

    }

    this.startDrawing = function (event) {
        this.pressed = true;
        pause = false;

        //console.log('left or not: ' + this.left);

        this.calculateCanvasPosition(event);
        if (this.isInBigCircle()) {
            if (this.left && holdLeft) {
                holdLeft = false;
                console.log('left ' + holdLeft);
            } else {
                if (!this.left && holdRight) {
                    holdRight = false;
                    console.log('right' + holdRight);
                }
            }

            if (this.left) {
                pressedL = true;
                c3.clearRect(0, 0, canvas2.width * 0.5, canvas2.height);
            } else {
                pressedR = true;
                c3.clearRect(canvas2.width * 0.5, 0, canvas2.width, canvas2.height);
            }
            console.log('in start');
            //console.log('x:' + this.newCirX);
            //console.log('y:' + this.newCirY);
            this.drawOuterCircle();
            this.drawPath();
            this.drawInnerCircle(this.newCirX, this.newCirY);

            let calculatedArray = this.mapPosition(this.newCirX, this.newCirY);
            if (this.left && !holdRight) {
                storedLX = calculatedArray[0];
                storedLY = calculatedArray[1];
                storedRX = 0;
                storedRY = 0;
            } else if (!this.left && !holdLeft) {
                storedRX = calculatedArray[0];
                storedRY = calculatedArray[1];
                storedLX = 0;
                storedLY = 0;
            }
            this.createUiArray();
            this.calculatedSpeedArray = this.matrixMultiplication();
            let rearrangedArray = this.rearrangedArray();
            animation3D();
            drawActionCircles(this.calculatedSpeedArray);
            drawSpeedometer(rearrangedArray);
            drawSpeedBar(rearrangedArray);
            adjustSpeed(this.calculatedSpeedArray);
            writePercentage(rearrangedArray);
            writeDescription(storedLLRR);

        } else {
            //console.log('not in circle');
        }

    }
    this.createUiArray = () => {
        storedLLRR = [];
        storedLLRR.push(storedLY);
        storedLLRR.push(storedRX);
        storedLLRR.push(storedRY);
        storedLLRR.push(storedLX);
        console.log('Ui Array:' + storedLLRR);
    }
    this.rearrangedArray = () => {
        let rearrangedArray = [];
        rearrangedArray.push(this.calculatedSpeedArray[3]);
        rearrangedArray.push(this.calculatedSpeedArray[0]);
        rearrangedArray.push(this.calculatedSpeedArray[2]);
        rearrangedArray.push(this.calculatedSpeedArray[1]);
        //console.log('rearranged Array:' + rearrangedArray);
        return rearrangedArray;

    }

    this.dragDraw = function (event) {
        //console.log('left or not drag: ' + this.left);

        if ((this.left && !holdLeft) || (!this.left && !holdRight)) {
            pause = false;
            if (this.left && pressedL || !this.left && pressedR) {
                this.calculateCanvasPosition(event);
                if (this.isInBigCircle()) {
                    if (this.left) {
                        c3.clearRect(0, 0, canvas2.width * 0.5, canvas2.height);
                    } else {
                        c3.clearRect(canvas2.width * 0.5, 0, canvas2.width, canvas2.height);
                    }
                    console.log('in drag');

                    this.drawOuterCircle();
                    this.drawPath();
                    this.drawInnerCircle(this.newCirX, this.newCirY);

                    let calculatedArray = this.mapPosition(this.newCirX, this.newCirY);
                    if (this.left && !holdRight) {
                        storedLX = calculatedArray[0];
                        storedLY = calculatedArray[1];
                        storedRX = 0;
                        storedRY = 0;
                        console.log('left ' + holdLeft);
                    } else if (this.left && holdRight) {
                        storedLX = calculatedArray[0];
                        storedLY = calculatedArray[1];
                    } else if (!this.left && !holdLeft) {
                        storedRX = calculatedArray[0];
                        storedRY = calculatedArray[1];
                        storedLX = 0;
                        storedLY = 0;
                        console.log('right ' + holdRight);
                    } else {
                        storedRX = calculatedArray[0];
                        storedRY = calculatedArray[1];
                    }

                    this.createUiArray();
                    animation3D();
                    this.calculatedSpeedArray = this.matrixMultiplication();
                    let rearrangedArray = this.rearrangedArray();
                    drawSpeedometer(rearrangedArray);
                    drawSpeedBar(rearrangedArray);
                    adjustSpeed(this.calculatedSpeedArray);
                    writePercentage(rearrangedArray);
                    writeDescription(storedLLRR);
                    drawActionCircles(this.calculatedSpeedArray);


                } else {
                    return;
                }
            }
        }

    }


    this.stopDrawing = function (event) {
        if (!holdLeft || !holdRight) {
            if (this.left) {
                pressedL = false;
                c3.clearRect(0, 0, canvas2.width * 0.5, canvas2.height);
            } else {
                pressedR = false;
                c3.clearRect(canvas2.width * 0.5, 0, canvas2.width, canvas2.height);
            }
            console.log('stop drawing called');
            this.drawOuterCircle();
            this.drawPath();
            this.drawInnerCircle(this.centerXJ, this.centerYJ);

            if (!holdLeft && !holdRight) {
                pause = true;
                storedLX = 0;
                storedLY = 0;
                storedRX = 0;
                storedRY = 0;
            } else if (holdLeft && !holdRight) {
                storedRX = 0;
                storedRY = 0;
                console.log('left ' + holdLeft);
            } else if (!holdLeft && holdRight) {
                storedLX = 0;
                storedLY = 0;
            } else if (!this.left && !holdLeft) {
                holdRight = true;
                storedRX = calculatedArray[0];
                storedRY = calculatedArray[1];
                storedLX = 0;
                storedLY = 0;
                console.log('right ' + holdRight);
            } else {
                console.log('super weird thing happen');
            }
            this.createUiArray();
            this.calculatedSpeedArray = this.matrixMultiplication();
            let rearrangedArray = this.rearrangedArray();
            drawActionCircles(this.calculatedSpeedArray);
            drawSpeedometer(rearrangedArray);
            drawSpeedBar(rearrangedArray);
            adjustSpeed(this.calculatedSpeedArray);
            writePercentage(rearrangedArray);
            writeDescription(storedLLRR);
        }
    }
    this.calculateCanvasPosition = function (event) {
        if (touched) {
            this.clickedX = touchCoor.clientX;
            this.clickedY = touchCoor.clientY;


            // this.clickedX = event.touches[0].clientX;
            //console.log('x1: fixed if tou remove cal' + this.clickedX);

            // this.clickedY = event.touches[0].clientY;
            //console.log('y1: fixed if tou' + this.clickedY);
        } else {
            this.clickedX = event.clientX;
            //console.log('x1: fixed if mouse' + this.clickedX);

            this.clickedY = event.clientY;
            //console.log('y1: fixed if mouse' + this.clickedY);
        };
        const rect = canvas3.getBoundingClientRect()
        this.newCirX = (this.clickedX - rect.left) * window.devicePixelRatio;
        this.newCirY = (this.clickedY - rect.top) * window.devicePixelRatio;
        // let arrayTry = getRelativeCoordinates(event,canvas3)
        // this.newCirX = event.offsetX*window.devicePixelRatio;
        // this.newCirY = event.offsetY*window.devicePixelRatio;
        // console.log('newCirX'+this.newCirX);
        // console.log('newCirY'+this.newCirY);
        // console.log('centerXJ'+this.centerXJ);
        // console.log('centerYJ'+this.centerYJ);

    }


    this.isInBigCircle = function () {
        let calRadius = Math.sqrt(Math.pow(this.newCirX - this.centerXJ, 2) + Math.pow(this.newCirY - this.centerYJ, 2));
        //console.log('calradius:' + calRadius);
        //console.log('radius:' + this.radiusJ);

        if (calRadius <= this.radiusJ) {
            console.log("in big");
            return true;
        } else {
            //console.log("not in big");
            return false;
        }
    }
    this.isInBiggerCircle = function () {
        let calRadius = Math.sqrt(Math.pow(this.newCirX - this.centerXJ, 2) + Math.pow(this.newCirY - this.centerYJ, 2));
        if (calRadius - 40 <= this.radiusJ) {
            //console.log('in biggercircle');
            return true;
        } else {
            return false;

        }
    }

    this.mapPosition = (xClicked, yClicked) => {
        let x = Math.sqrt(Math.pow(this.radiusJ, 2) - Math.pow(yClicked - this.centerYJ, 2));
        let x1 = this.centerXJ - x;
        //let x2 = this.centerXJ +x;
        let lengthX = 2 * x;
        let ratioX = (xClicked - x1) / lengthX;
        //console.log(ratioX);

        let y = Math.sqrt(Math.pow(this.radiusJ, 2) - Math.pow(xClicked - this.centerXJ, 2));
        console.log('y:' + y);
        //console.log('radius:' + this.radiusJ);
        //console.log('center:' + this.centerXJ);

        //console.log('XClicked:' + xClicked);

        let y1 = this.centerYJ - y;
        //let y2 = this.centerYJ +y;
        let lengthY = 2 * y;
        //console.log('lengthy:' + y);
        //console.log('yClicked:' + yClicked);

        var ratioY = (yClicked - y1) / lengthY;
        if (this.left) {
            ratioY = 1 - ratioY;
        }
        //console.log('ratioY:' + ratioY);

        let scaleX = ratioX * 2 - 1;
        let scaleY = ratioY * 2 - 1;
        //console.log(scaleX + ', ' + scaleY);

        return [scaleX, scaleY];
    }
    this.matrixMultiplication = () => {
        let gMatrix = [
            [1, -1, 1, -1],
            [1, -1, -1, 1],
            [1, 1, -1, -1],
            [1, 1, 1, 1]
        ];
        let uiMatrix = [
            [storedLLRR[0]],
            [storedLLRR[1]],
            [storedLLRR[2]],
            [storedLLRR[3]]
        ];

        return this.matrixMultiplicationHelper(gMatrix, uiMatrix);
    }

    this.matrixMultiplicationHelper = (m1, m2) => {
        let result = [];
        let scaledResultA = [];
        for (let i = 0; i < m1.length; i++) {
            result[i] = [];
            for (let j = 0; j < m2[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < m1[0].length; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                result[i][j] = sum;
                scaledResultA.push(result[i][j] * 12.5 + 50);
            }
        }
        console.log(scaledResultA);
        return scaledResultA;
    }

    this.backToCenter = function (direction) {
        flyUpB = true;
        firstT = true;
        let rankArray = [50, 50, 50, 50]
        drawSpeedBar(rankArray);
    }
}

function adjustSpeed(calculatedSpeedArray) {
    speedControl1 = calculatedSpeedArray[3] / 500 * 2;
    speedControl2 = calculatedSpeedArray[0] / 500 * 2;
    speedControl3 = calculatedSpeedArray[2] / 500 * 2;
    speedControl4 = calculatedSpeedArray[1] / 500 * 2;

    // console.log('sp1: ' + speedControl1);
    // console.log('sp2: ' + speedControl2);
    // console.log('sp3: ' + speedControl3);
    // console.log('sp4: ' + speedControl4);

}

function selectColor(percentage) {
    if (percentage < 20) {
        c3.fillStyle = '#8281A0';
    } else if (percentage < 40) {
        c3.fillStyle = '#B0D8A4';
    } else if (percentage < 60) {
        c3.fillStyle = '#fEE191';
    } else if (percentage < 80) {
        c3.fillStyle = '#FD8060';
    } else {
        c3.fillStyle = '#E84258';
    }

}

function drawSpeedometer(rearrangedArray) {

    let postionArray = calculateBodyPosition();
    let xMid = postionArray[0];
    let yMid = postionArray[1];
    let x1 = postionArray[2];
    let y1 = postionArray[3];
    let side = postionArray[4];

    //first propeller
    c3.beginPath();
    c3.arc(x1, y1, infoArray[2] * 1.25, 0, 0.5 * Math.PI, true);
    c3.lineTo(xMid - infoArray[2] * 1.25, yMid);
    c3.lineTo(xMid, yMid - infoArray[2] * 1.5);
    c3.closePath();
    selectColor(rearrangedArray[0]);
    c3.fill();

    //second propeller
    c3.beginPath();
    c3.arc(x1 + side, y1, infoArray[2] * 1.25, Math.PI, 0.5 * Math.PI, false);
    c3.lineTo(xMid, yMid + infoArray[2] * 1.25);
    c3.lineTo(xMid - infoArray[2] * 1.5, yMid);
    c3.closePath();
    selectColor(rearrangedArray[1]);
    c3.fill();


    // 3 propeller
    c3.beginPath();
    c3.arc(x1, y1 + side, infoArray[2] * 1.25, 0, 3 / 2 * Math.PI, false);
    c3.lineTo(xMid, yMid - infoArray[2] * 1.25);
    c3.lineTo(xMid + infoArray[2] * 1.5, yMid);
    c3.closePath();
    selectColor(rearrangedArray[2]);
    c3.fill();


    //fourth propeller
    c3.beginPath();
    c3.arc(x1 + side, y1 + side, infoArray[2] * 1.25, Math.PI, 1.5 * Math.PI, true);
    c3.lineTo(xMid, yMid - infoArray[2] * 1.25);
    c3.lineTo(xMid - infoArray[2] * 1.5, yMid);
    c3.closePath();
    selectColor(rearrangedArray[3]);
    c3.fill();

    //middle body
    c3.beginPath();
    c3.arc(xMid, yMid, infoArray[2] * 10.9, 0, 2 * Math.PI, true);
    let gradient = c3.createRadialGradient(xMid, yMid, infoArray[2] * 1, xMid, yMid, infoArray[2] * 11);
    gradient.addColorStop(1, '#696969');
    gradient.addColorStop(0, '#b0aeae');
    c3.fillStyle = gradient;
    c3.fill();
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

    let side = 0.4 * width;
    if (height < width) {
        side = 0.4 * height;
    }
    let xMid = infoArray[0] * 0.5;
    let yMid = infoArray[1] * 0.45;
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
    c.arc(x1, y1, infoArray[2] * 2, 0, 0.5 * Math.PI, true);
    c.lineTo(x1 + side - infoArray[2] * 2, y1 + side);
    c.arc(x1 + side, y1 + side, infoArray[2] * 2, Math.PI, 1.5 * Math.PI, true);
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
    c.arc(x1, y1 + side, infoArray[2] * 2, 0, 3 / 2 * Math.PI, false);
    c.lineTo(x1 + side - infoArray[2] * 2, y1);
    c.arc(x1 + side, y1, infoArray[2] * 2, Math.PI, 0.5 * Math.PI, false);
    c.closePath();
    c.stroke();
    c.fill();

    //middle body
    c.beginPath();
    c.arc(xMid, yMid, infoArray[2] * 11, 0, 2 * Math.PI, true);
    let gradient = c.createRadialGradient(xMid, yMid, infoArray[2] * 1, xMid, yMid, infoArray[2] * 11);
    gradient.addColorStop(1, '#696969');
    gradient.addColorStop(0, '#b0aeae');
    c.fillStyle = gradient;
    c.fill();


}

function init() {
    inited = true;
    joyLeft.drawOuterCircle();
    joyLeft.drawPath();
    joyLeft.drawInnerCircle(joyLeft.centerXJ, joyLeft.centerYJ);
    joyRight.drawOuterCircle();
    joyRight.drawPath();
    joyRight.drawInnerCircle(joyRight.centerXJ, joyRight.centerYJ);
    //let percentageArray = [50, 50, 50, 50]
    drawSpeedBar([50, 50, 50, 50]);
    writePercentage([50, 50, 50, 50]);
    adjustSpeed([50, 50, 50, 50]);
    //writeDescription([0, 0, 0, 0]);
    drawCanvasBackground();
    drawActionCircles([50, 50, 50, 50]);
    animate();
}

function drawingPropeller(number) {
    c.save();
    for (let i = 1; i < 3; i++) {
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(-infoArray[2], infoArray[2] * 5);
        c.lineTo(infoArray[2] * 1.25, infoArray[2] * 13);
        c.lineTo(infoArray[2] * 2.5, infoArray[2] * 13);
        c.lineTo(infoArray[2] + infoArray[2] * 2, infoArray[2] * 5);
        c.lineTo(infoArray[2] * 0.5, 0);
        c.closePath();
        c.fill();
        c.rotate(Math.PI);
    }

    c.restore();
    c.beginPath();
    c.arc(0, 0, infoArray[2] * 1.25, 0, Math.PI * 2.5, false);
    c.fillStyle = '#404040';
    c.fill();

    c.beginPath();
    c.arc(0, 0, infoArray[2] * 0.75, 0, Math.PI * 2.5, false);
    c.fillStyle = '#b0aeae';
    c.fill();

}

function drawSpeedBar(rearrangedArray) {
    c3.clearRect(0, 0, infoArray[0], 0.9 * infoArray[1] - 6.7 * infoArray[2]);
    let postionArray = calculateBodyPosition();
    let xMid = postionArray[0];
    let y1 = postionArray[3];
    let side = postionArray[4];
    let xL = infoArray[0] * 0.0875;
    let xR = infoArray[0] - infoArray[0] * 0.0875;

    let barHeight = infoArray[1] * 0.25;

    c3.save();
    c3.translate(xL, y1 - 0.25 * side);
    drawSpeedBarHelper(barHeight, false);
    drawFillSpeedBar(rearrangedArray[0]);
    c3.restore();

    c3.save();
    c3.translate(xR, y1 - 0.25 * side);
    drawSpeedBarHelper(barHeight, false);
    drawFillSpeedBar(rearrangedArray[1]);
    c3.restore();

    c3.save();
    c3.translate(xL, y1 + 0.75 * side);
    drawSpeedBarHelper(barHeight, false);
    drawFillSpeedBar(rearrangedArray[2]);
    c3.restore();

    c3.save();
    c3.translate(xR, y1 + 0.75 * side);
    drawSpeedBarHelper(barHeight, false);
    drawFillSpeedBar(rearrangedArray[3]);
    c3.restore();
}

function drawFillSpeedBar(percentage) {
    let barHeight = infoArray[1] * 0.25;
    drawSpeedBarHelper(barHeight * (100 - percentage) / 100, true);
    selectColor(percentage);
    c3.fill();
    c3.stroke();

    c3.rect(-infoArray[0] * 0.0108, barHeight * (100 - percentage) / 100, infoArray[0] * 0.0425, infoArray[1] * 0.0105);
    c3.fill();
    c3.stroke();

}



function drawSpeedBarHelper(ratio, writeNo) {
    let barHeight = infoArray[1] * 0.25;
    if (!writeNo) {
        c3.beginPath();
        c3.rect(0, 0, 0.0225 * infoArray[0], ratio);
        c3.fillStyle = '#FFFFFF';
        c3.fill();
        c3.stroke();
    } else {
        let fontSize = Math.floor(0.38 * infoArray[0] / 25);
        let fontFillStyle = fontSize + "px Poppins";
        //console.log(fontFillStyle);
        c3.font = fontFillStyle;
        c3.fillStyle = '#000000';
        c3.fillText(100 + '%', 0, -0.0085 * infoArray[0]);
        c3.fillText(0 + '%', 0, 0.0085 * infoArray[0] + 0.2 * infoArray[1] + 6 * infoArray[2]);

        c3.beginPath();
        c3.rect(0, ratio, 0.0225 * infoArray[0], barHeight - ratio);
    }

}

function writePercentage(percentage) {
    let fontSize = Math.floor(0.38 * infoArray[0] / 15);
    let fontFillStyle = fontSize + "px Poppins";
    c3.font = fontFillStyle;
    c3.fillStyle = '#000000';

    c3.fillText(Math.floor(percentage[0]) + '%', infoArray[0] * 0.17, infoArray[1] * 0.13);
    c3.fillText(Math.floor(percentage[1]) + '%', infoArray[0] * 0.80, infoArray[1] * 0.13);
    c3.fillText(Math.floor(percentage[2]) + '%', infoArray[0] * 0.17, infoArray[1] * 0.83);
    c3.fillText(Math.floor(percentage[3]) + '%', infoArray[0] * 0.80, infoArray[1] * 0.83);
    fontSize = Math.floor(0.38 * infoArray[0] / 25);
    fontFillStyle = fontSize + "px Poppins";
    c3.font = fontFillStyle;

    c3.fillText('DRONE FRONT', infoArray[0] * 0.425, infoArray[1] * 0.13);


}

function writeDescription(uiArray) {
    let outputArray = [];

    if (uiArray[0] < -0.05) {
        outputArray.push('DESCEND');
    } else if (uiArray[0] > 0.05) {
        outputArray.push('ASCEND');
    }

    if (uiArray[3] < -0.05) {
        outputArray.push('ROTATE LEFT');
    } else if (uiArray[3] > 0.05) {
        outputArray.push('ROTATE RIGHT');
    }

    if (uiArray[2] < -0.05) {
        outputArray.push('FORWARD');
    } else if (uiArray[2] > 0.05) {
        outputArray.push('BACKWARD');
    }

    if (uiArray[1] < -0.05) {
        outputArray.push('LEFT');
    } else if (uiArray[1] > 0.05) {
        outputArray.push('RIGHT');
    }

    let fontSize = Math.floor(0.38 * infoArray[0] / 20);
    let fontFillStyle = fontSize + "px Poppins";
    c3.font = fontFillStyle;
    c3.fillStyle = '#000000';
    for (let i = 0; i < outputArray.length; i++) {
        if (outputArray.length === 2) {
            c3.fillText(outputArray[i] + ' ', infoArray[0] * 0.63 * (i + 1) / outputArray.length, infoArray[1] * 0.085);
        } else if (outputArray.length === 1) {
            c3.fillText(outputArray[i] + ' ', infoArray[0] * 0.43 * (i + 1) / outputArray.length, infoArray[1] * 0.085);

        } else {
            c3.fillText(outputArray[i] + ' ', infoArray[0] * 0.1 + infoArray[0] * 0.63 * (i + 1) / outputArray.length, infoArray[1] * 0.085);
        }

    }
}

function animate() {
    angle1 += speedControl1;
    angle4 += speedControl4;
    angle2 -= speedControl2;
    angle3 -= speedControl3;
    reposition();
    requestAnimationFrame(animate);
}