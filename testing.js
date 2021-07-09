const canvas2 = document.getElementById('canvas2');
const c = canvas2.getContext('2d');
const navBar = document.getElementById('navbar');
const nav = navBar.getBoundingClientRect()
const navBarHeight = nav.height;
const canvas3 = document.getElementById('joyStick');
const c3 = canvas3.getContext('2d');
const canvas1 = document.querySelector(".webgl")

import * as THREE from './three.module.js'
import {
    GLTFLoader
} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
const loader = new GLTFLoader()
var drone;


const scene = new THREE.Scene()
// const axesHelper = new THREE.AxesHelper(40);
scene.background = new THREE.Color(0xe4eefd);
// scene.add(axesHelper);
loader.load('./file-1592658408798.glb', (glb) => {

        drone = glb.scene;
        drone.scale.set(20, 20, 20);
        drone.position.set(0, 0, 0)
        scene.add(drone)
    },

    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "%loaded")
    },
    function (error) {
        console.log('An error occurred')
    })

const light = new THREE.DirectionalLight(0xffffff, 4)
scene.add(light)

const light2 = new THREE.DirectionalLight(0xffffff, 13)
light2.position.set(0, 4, 5)
scene.add(light2)

const light3 = new THREE.AmbientLight(0xffffff, 2.5)
//light3.position.set(0,0,15)
scene.add(light3)

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)

//helper
// const DirectionHelper = new THREE.DirectionalLightHelper(light2, 0.2);
// scene.add(DirectionHelper)



const canvas = document.querySelector(".webgl")
const sizes = {
    width: window.innerWidth * 0.5,
    height: window.innerHeight - navBarHeight
}

if (window.innerWidth < 768) {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight * 0.5 - navBarHeight * 0.5
}

//sizing canvas

canvas3.width = sizes.width;
canvas3.height = sizes.height;
canvas2.width = sizes.width;
canvas2.height = sizes.height;



window.addEventListener('resize', function () {
    //update camera
    sizes.width = window.innerWidth * 0.5;
    sizes.height = window.innerHeight - navBarHeight;

    if (window.innerWidth < 768) {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight * 0.5 - navBarHeight * 0.5
    }

    //sizing canvas

    canvas3.width = sizes.width;
    canvas3.height = sizes.height;
    canvas2.width = sizes.width;
    canvas2.height = sizes.height;



    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height) //update renderer
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    console.log(window.devicePixelRatio);

    repositionJoy();
    reposition();
});


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 15)
scene.add(camera)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




function animate1() {
    requestAnimationFrame(animate1)
    if (drone) {
        //console.log(drone.position)
        //camera.lookAt(drone.position)
        //light.lookAt(drone.position)

        //drone.rotation.z+=0.01;
    }
    renderer.render(scene, camera)
}
animate1()

function flyUp() {
    if (!pause) {
        requestAnimationFrame(flyUp)
        if (drone) {
            console.log(drone)
            camera.lookAt(drone.position)
            light.lookAt(drone.position)
            drone.position.y += 0.001;
        }
        renderer.render(scene, camera)

    }

}

function rotateL() {
    if (!pause) {
        requestAnimationFrame(rotateL)
        if (drone) {
            //console.log(drone)
            camera.lookAt(drone.position)
            //light.lookAt(drone.position)
            drone.rotateY(0.001);
        }
        renderer.render(scene, camera)
    }

}
var id;
var pause = false;

function backward() {
    if (!pause) {
        id = requestAnimationFrame(backward)
        if (drone) {
            //console.log(drone)
            camera.lookAt(drone.position)
            //light.lookAt(drone.position)
            drone.position.z -= 0.01;
        }
        renderer.render(scene, camera)
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

    c3.clearRect(0, 0.9 * infoArray[1] - 6 * infoArray[2], canvas2.width, canvas2.height);
    joyLeft.drawOuterCircle();
    joyLeft.drawPath();
    joyLeft.drawInnerCircle(x1, 0.925 * infoArray[1]);
    joyRight.drawOuterCircle();
    joyRight.drawPath();
    joyRight.drawInnerCircle(x1 + side, 0.925 * infoArray[1]);


}


var infoArray = calculateOrigin()
let postionArray = calculateBodyPosition();
let x1 = postionArray[2];
let side = postionArray[4];
var joyLeft = new JoyStick(x1, 0.9 * infoArray[1], 6 * infoArray[2], true);
var joyRight = new JoyStick(x1 + side, 0.9 * infoArray[1], 6 * infoArray[2], false);

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
    touched = true;
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
    touched = false;
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
var speedControlArray = [];
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
        let gradient = c3.createRadialGradient(this.centerXJ, this.centerYJ, this.radiusJ * 0.45, this.centerXJ, this.centerYJ, this.radiusJ);
        gradient.addColorStop(0, '#96948F');
        gradient.addColorStop(1, '#B0AFAA');
        c3.fillStyle = '#696969';
        c3.fill();
        //console.log('drew Outer Circle Joy');

    }

    this.drawInnerCircle = function (x, y) {

        c3.beginPath();
        c3.arc(x, y, this.radiusJ * 0.45, 0, Math.PI * 2, false);
        let gradient = c3.createRadialGradient(this.centerXJ, this.centerYJ, this.radiusJ * 0.15, this.centerXJ, this.centerYJ, this.radiusJ * 0.45);
        gradient.addColorStop(0, '#E8E6E1');
        gradient.addColorStop(1, '#A39E93');
        c3.fillStyle = gradient;
        c3.fill();
        //console.log('drew Inner Circle Joy');
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
            this.drawPath();

            this.drawInnerCircle(this.newCirX, this.newCirY);
        } else {
            console.log('not in ');
        }
        if (this.left) {
            pressedL = true;
            pressedR = false;
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
                this.drawPath();
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
                //console.log('bigger circle');
                if (this.left === true) {
                    c3.clearRect(0, 0, canvas2.width * 0.5, canvas2.height);
                } else {
                    c3.clearRect(canvas2.width * 0.5, 0, canvas2.width, canvas2.height);
                }
                var angle = this.calculateAngle(event);
                this.calculateCoordinate(angle);
                this.drawOuterCircle();
                this.drawPath();
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

        this.drawOuterCircle();
        this.drawPath();
        this.drawInnerCircle(this.centerXJ, this.centerYJ);
        this.backToCenter(this.direction);


    }
    this.calculateCanvasPosition = function (event) {
        if (touched) {
            this.clickedX = event.touches[0].clientX;
            //console.log('x1: fixed if tou remove cal' + this.clickedX);

            this.clickedY = event.touches[0].clientY;
            //console.log('y1: fixed if tou' + this.clickedY);
        } else {
            this.clickedX = event.clientX;
            //console.log('x1: fixed if mouse' + this.clickedX);

            this.clickedY = event.clientY;
            //console.log('y1: fixed if mouse' + this.clickedY);
        };
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
        //console.log('degree in calAngle: ' + rad * 180 / Math.PI);
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
        //console.log('degree in getDirection:' + deg);
        let oct = Math.floor(deg / 45);
        //console.log('divide by 45: ' + oct);
        let DirArray = ['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE'];
        console.log(DirArray[oct]);
        return DirArray[oct];

    }

    this.changeSpeedL = function (direction) {
        if (direction === 'N') {
            this.ascending = true;
            if (speedControl1 <= 0.45) {
                speedControl1 += 0.005;
            }
            if (speedControl2 <= 0.45) {
                speedControl2 += 0.005;
            }
            if (speedControl3 <= 0.45) {
                speedControl3 += 0.005;
            }
            if (speedControl4 <= 0.45) {
                speedControl4 += 0.005;
            }
            pause = false;
            flyUp();

        } else if (direction === 'S') {
            this.descending = true;

            if (speedControl1 > 0) {
                if (speedControl1 < -0.003) {
                    speedControl1 = 0.003;
                }
                speedControl1 -= 0.003;
            }
            if (speedControl2 > 0) {
                if (speedControl2 < -0.003) {
                    speedControl2 = 0.003;
                }
                speedControl2 -= 0.003;
            }
            if (speedControl3 > 0) {
                if (speedControl3 < -0.003) {
                    speedControl3 = 0.003;
                }
                speedControl3 -= 0.003;
            }
            if (speedControl4 > 0) {
                if (speedControl4 < -0.003) {
                    speedControl4 = 0.003;
                }
                speedControl4 -= 0.003;
            }
        } else if (direction === 'W') {
            if (speedControl1 <= 0.45) {
                speedControl1 += 0.005;
            }
            if (speedControl4 <= 0.45) {
                speedControl4 += 0.005;
            }
            speedControl2 = initialSpeed;
            speedControl3 = initialSpeed;
            pause = false;
            rotateL();

        } else if (direction === 'E') {
            if (speedControl2 <= 0.45) {
                speedControl2 += 0.005;
            }
            if (speedControl3 <= 0.45) {
                speedControl3 += 0.005;
            }
            speedControl1 = initialSpeed;
            speedControl4 = initialSpeed;

        } else if (direction === 'NE') {
            if (speedControl2 <= 0.45) {
                speedControl2 += 0.005;
            }
            speedControl3 = speedControl2;
            speedControl1 = speedControl2 - 0.02;
            speedControl4 = speedControl2 - 0.02;

        } else if (direction === 'NW') {
            if (speedControl1 <= 0.45) {
                speedControl1 += 0.005;
            }
            speedControl4 = speedControl1;
            speedControl2 = speedControl1 - 0.02;
            speedControl3 = speedControl1 - 0.02;
        } else if (direction === 'SE') {
            if (speedControl2 > 0) {
                if (speedControl2 < 0.0025) {
                    speedControl2 = 0.0025;
                }
                speedControl2 -= 0.0025;
            }
            speedControl3 = speedControl2;
            if (speedControl1 > 0) {
                speedControl1 = speedControl2 - 0.02;
                speedControl4 = speedControl2 - 0.02;
            }

        } else if (direction === 'SW') {
            if (speedControl1 > 0) {
                if (speedControl1 < 0.0025) {
                    speedControl1 = 0.0025;
                }
                speedControl1 -= 0.0025;
            }
            speedControl4 = speedControl1;
            if (speedControl2 > 0) {
                speedControl2 = speedControl1 - 0.02;
                speedControl3 = speedControl1 - 0.02;
            }
        }
        speedControlArray = [];
        speedControlArray.push(speedControl1);
        speedControlArray.push(speedControl2);
        speedControlArray.push(speedControl3);
        speedControlArray.push(speedControl4);
        let rankArray = rankSpeedControl();
        drawSpeedometer(rankArray);
    }
    this.backToCenter = function (direction) {
        cancelAnimationFrame(id);
        pause = true;
        id = undefined;
        speedControl1 = initialSpeed;
        speedControl4 = initialSpeed;
        speedControl2 = initialSpeed;
        speedControl3 = initialSpeed;
    }

    this.changeSpeedR = function (direction) {
        if (direction === 'N') {
            if (speedControl3 <= 0.35) {
                speedControl3 += 0.005;
            }
            if (speedControl4 <= 0.35) {
                speedControl4 += 0.005;
            }
            speedControl1 = initialSpeed;
            speedControl2 = initialSpeed;

        } else if (direction === 'S') {

            if (speedControl1 <= 0.35) {
                speedControl1 += 0.005;
            }
            if (speedControl2 <= 0.35) {
                speedControl2 += 0.005;
            }
            speedControl3 = initialSpeed;
            speedControl4 = initialSpeed;
            pause = false;
            backward();

        } else if (direction === 'W') {

            if (speedControl2 <= 0.35) {
                speedControl2 += 0.005;
            }
            if (speedControl4 <= 0.35) {
                speedControl4 += 0.005;
            }
            speedControl1 = initialSpeed;
            speedControl3 = initialSpeed;
        } else if (direction === 'E') {
            //console.log('hereE');

            if (speedControl1 <= 0.35) {
                speedControl1 += 0.005;
            }
            if (speedControl3 <= 0.35) {
                speedControl3 += 0.005;
            }
            speedControl2 = initialSpeed;
            speedControl4 = initialSpeed;
        } else if (direction === 'NE') {
            if (speedControl3 <= 0.35) {
                speedControl3 += 0.005;
            }
            speedControl1 = speedControl3 - 0.025;
            speedControl4 = speedControl3 - 0.025;
            speedControl2 = initialSpeed;

        } else if (direction === 'NW') {

            if (speedControl4 <= 0.35) {
                speedControl4 += 0.005;
            }
            speedControl3 = speedControl4 - 0.025;
            speedControl2 = speedControl4 - 0.025;
            speedControl1 = initialSpeed;
        } else if (direction === 'SW') {

            if (speedControl2 <= 0.35) {
                speedControl2 += 0.005;
            }
            speedControl1 = speedControl2 - 0.025;
            speedControl4 = speedControl2 - 0.025;
            speedControl3 = initialSpeed;
        } else if (direction === 'SE') {
            if (speedControl1 <= 0.35) {
                speedControl1 += 0.005;
            }
            speedControl2 = speedControl1 - 0.025;;
            speedControl3 = speedControl1 - 0.025;
            speedControl4 = initialSpeed;
        }
        speedControlArray = [];
        speedControlArray.push(speedControl1);
        speedControlArray.push(speedControl2);
        speedControlArray.push(speedControl3);
        speedControlArray.push(speedControl4);
        let rankArray = rankSpeedControl();
        console.log(rankArray);
        drawSpeedometer(rankArray);
    }
}

function selectColor(rankNo) {
    if (rankNo === 1) {
        c3.fillStyle = '#E84258';
    } else if (rankNo === 2) {
        c3.fillStyle = '#FD8060';
    } else if (rankNo === 3) {
        c3.fillStyle = '#fEE191';
    } else if (rankNo === 4) {
        c3.fillStyle = '#B0D8A4';
    }

}

function drawSpeedometer(rankArray) {

    let postionArray = calculateBodyPosition();
    let xMid = postionArray[0];
    let yMid = postionArray[1];
    let x1 = postionArray[2];
    let y1 = postionArray[3];
    let side = postionArray[4];

    //first propeller
    c3.beginPath();
    c3.arc(x1, y1, infoArray[2] * 2, 0, 0.5 * Math.PI, true);
    c3.lineTo(xMid - infoArray[2] * 2, yMid);
    c3.lineTo(xMid, yMid - infoArray[2] * 2);
    c3.closePath();
    selectColor(rankArray[0]);
    c3.fill();

    //second propeller
    c3.beginPath();
    c3.arc(x1 + side, y1, infoArray[2] * 2, Math.PI, 0.5 * Math.PI, false);
    c3.lineTo(xMid, yMid + infoArray[2] * 2);
    c3.lineTo(xMid - infoArray[2] * 2, yMid);
    c3.closePath();
    selectColor(rankArray[1]);
    c3.fill();


    // 3 propeller
    c3.beginPath();
    c3.arc(x1, y1 + side, infoArray[2] * 2, 0, 3 / 2 * Math.PI, false);
    c3.lineTo(xMid, yMid - infoArray[2] * 2);
    c3.lineTo(xMid + infoArray[2] * 2, yMid);
    c3.closePath();
    selectColor(rankArray[2]);
    c3.fill();


    //fourth propeller
    c3.beginPath();
    c3.arc(x1 + side, y1 + side, infoArray[2] * 2, Math.PI, 1.5 * Math.PI, true);
    c3.lineTo(xMid, yMid - infoArray[2] * 2);
    c3.lineTo(xMid - infoArray[2] * 2, yMid);
    c3.closePath();
    selectColor(rankArray[3]);
    c3.fill();

    //middle body
    c3.beginPath();
    c3.arc(xMid, yMid, infoArray[2] * 14.9, 0, 2 * Math.PI, true);
    let gradient = c3.createRadialGradient(xMid, yMid, infoArray[2] * 1, xMid, yMid, infoArray[2] * 15);
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
    joyLeft.drawPath();
    joyLeft.drawInnerCircle(joyLeft.centerXJ, joyLeft.centerYJ);
    joyRight.drawOuterCircle();
    joyRight.drawPath();
    joyRight.drawInnerCircle(joyRight.centerXJ, joyRight.centerYJ);
    window.requestAnimationFrame(animate);
}

function rankSpeedControl() {

    let sorted = speedControlArray.slice().sort(function (a, b) {
        return b - a
    })
    let ranks = speedControlArray.slice().map(function (v) {
        return sorted.indexOf(v) + 1
    });
    return ranks;

}


function drawingPropeller(number) {
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