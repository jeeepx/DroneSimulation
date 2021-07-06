const joyDiv1 = document.getElementById('joyDiv1');
console.log(joyDiv1);
var c1 = joyDiv1.getContext('2d');

var width = window.innerWidth;
var height =  window.innerHeight;

// window.addEventListener('resize', function () {

//     joyDiv1.width = window.innerWidth * 0.5;
//     joyDiv1.height = window.innerHeight * 0.5;

//     if (window.innerWidth < 991) {
//         joyDiv1.width = window.innerWidth;
//         joyDiv1.height = 0.5 * window.innerHeight;

//     }
// });


var xOrigin = width * 0.5; //relative to canvas - fixed always
var yOrigin = height * 0.5; //relative to canvas
var radius = 100;
var pressed = false;
console.log('xOrigin '+xOrigin);
console.log('yOrigin '+yOrigin);
drawBigCircle();
drawSmallCircle(xOrigin, yOrigin);
joyDiv1.addEventListener('mousedown', startD);
joyDiv1.addEventListener('mouseup', stopD);
joyDiv1.addEventListener('mousemove', drag);


c1.beginPath();
    c1.arc(150, 50, radius/2, 0, Math.PI * 2, true);
    c1.fillStyle = 'black';
    c1.fill();
function drawBigCircle(x,y) {
    c1.beginPath();
    c1.arc(xOrigin, yOrigin, radius, 0, Math.PI * 2, true);
    c1.fillStyle = 'black';
    c1.fill();
    console.log('here');
}

function drawSmallCircle(x, y) {
    c1.beginPath();
    c1.arc(x, y, radius * 0.5, 0, Math.PI * 2, false);
    c1.fillStyle = "lightblue";
    c1.fill();
}

function getPosition(event) {
    var mouseX = event.clientX - joyDiv1.offsetLeft;
    console.log('clientX:'+ event.clientX);
    console.log('offsetLeft: '+joyDiv1.offsetLeft);
    console.log('mouseX subtracted:'+ mouseX);
    var mouseY = event.clientY-joyDiv1.offsetTop;
    console.log('clientY:'+ event.clientY);
    console.log('offsetTop: '+joyDiv1.offsetTop);
    console.log('mouseY subtracted:'+mouseY);
    return [mouseX, mouseY];
}

function isInBigCircle(mouseX, mouseY) {
    var calRadius = Math.sqrt(Math.pow(mouseX - xOrigin, 2) + Math.pow(mouseY - yOrigin, 2));
    console.log(calRadius);
    if (calRadius <= radius) {
        return true;
    } else {
        return false;
    }
}

function startD(event) {
    pressed = true;
    let whereToDraw = getPosition(event);
    console.log(whereToDraw);
    if (isInBigCircle(whereToDraw[0], whereToDraw[1])) {
        c1.clearRect(0, 0, joyDiv1.width, joyDiv1.height);
        console.log('after clear');
        drawBigCircle();
        drawSmallCircle(whereToDraw[0], whereToDraw[1]);
    } else {
        console.log('not in');
    }
}

function stopD(event) {
    pressed = false;
    whereToDraw = getPosition(event);
    c1.clearRect(0, 0, joyDiv1.width, joyDiv1.height);
    console.log('after clear stop');
    drawBigCircle();
    drawSmallCircle(xOrigin, yOrigin);

}

function drag(event) {
    if (pressed == true) {
        let whereToDraw = getPosition(event);
        if (isInBigCircle(whereToDraw[0], whereToDraw[1])) {
            c1.clearRect(0, 0, joyDiv1.width, joyDiv1.height);
            console.log('after clear');
            drawBigCircle();
            drawSmallCircle(whereToDraw[0], whereToDraw[1]);
        } else { //make it follow
            c1.clearRect(0, 0, joyDiv1.width, joyDiv1.height);
            console.log('not in');
            let rad = calculateAngle(event.clientX, event.clientY);
            coorArray = calculateCoordinate(rad);
            drawBigCircle();
            drawSmallCircle(coorArray[0], coorArray[1]);
        }
    }

}

function calculateAngle(xCoor, yCoor) {
    let rad = Math.atan2(yCoor - yOrigin, xCoor - xOrigin);
    console.log('degree in calAngle: ' + rad * 180 / Math.PI);
    return rad;
}

function calculateCoordinate(angle) {
    let x = Math.cos(angle) * radius + xOrigin;
    let y = Math.sin(angle) * radius  + yOrigin;
    return [x, y];
}

function getDirection(xCoor, yCoor) {
    let rad = calculateAngle(xCoor, yCoor);
    let deg = (rad * 180 / Math.PI)*1;
    if (deg < 0) {
        let factor = 180 + deg;
        deg = 180 + factor;
    }
    console.log('degree in getDirection:' + deg);
    let oct = Math.floor(deg / 45);
    console.log('divide by 45: ' + oct);
    let DirArray = ['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE'];
    console.log(DirArray[oct]);
    return DirArray[oct];
}