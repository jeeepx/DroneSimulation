var canvas2 = document.getElementById('canvas2');
var c = canvas2.getContext('2d');

var joy1 = new JoyStick('joyDiv1');
var joy2 = new JoyStick('joyDiv2');



// var canvas3 = document.getElementById('canvas3');
// var c3 = canvas3.getContext('2d');

//sizing canvas
canvas2.width = window.innerWidth * 0.5;
canvas2.height = window.innerHeight * 0.6;
if (window.innerWidth < 991) {
    canvas2.width = window.innerWidth;
    canvas2.height = 0.25 * window.innerHeight;
}

// canvas3.width = window.innerWidth*0.5;
// console.log(window.innerWidth);
// canvas3.height = window.innerHeight*0.4;
// if(window.innerWidth<991){
//     canvas3.width = window.innerWidth;
//     canvas3.height = 0.5*window.innerHeight;
// }
//resizing canvas

window.addEventListener('resize', function () {

    canvas2.width = window.innerWidth * 0.5;
    canvas2.height = window.innerHeight * 0.5;
    // canvas3.width = window.innerWidth*0.5;
    // canvas3.height = window.innerHeight*0.5;
    //console.log(window.innerWidth);

    if (window.innerWidth < 991) {
        canvas2.width = window.innerWidth;
        canvas2.height = 0.5 * window.innerHeight;
        // canvas3.width = window.innerWidth;
        // canvas3.height = 0.5*window.innerHeight;
    }
    reposition();
});
var oldDirection ='';
setInterval(function(){
    var direction1 = joy1.GetDir();
    var direction2= joy2.GetDir();
    var oldDirection= joy2.GetDir();
    console.log(direction1);
    if(direction1 === 'N'){
        if(speedControl1 <=0.34){
            speedControl1 += 0.005;
        }
        if(speedControl2 <=0.34){
            speedControl2 += 0.005;
        }
        if(speedControl3 <=0.34){
            speedControl3 += 0.005;
        }
        if(speedControl4 <=0.34){
            speedControl4 += 0.005;
        }

    }
    if(direction2 === 'N'){ //what about NW,NE
        if(speedControl3 <=0.34){
            speedControl3 += 0.005;
        }
        if(speedControl3 <=0.34){
            speedControl4 += 0.005;
        }
        console.log(speedControl3); //think about resetting after north??
    }else if(direction2 === 'E'){ //what about NW,NE
        if(speedControl1 <=0.34){
            speedControl1 += 0.005;
        }
        if(speedControl3 <=0.34){
            speedControl3 += 0.005;
        }
        console.log(speedControl3);
    }

},50);


// c3.arc(0.2*canvas3.width,0.5*canvas3.height,0.1*canvas3.width,0,2*Math.PI,false);
// c3.fillStyle = 'black';
// c3.fill();
// c3.arc(0.8*canvas3.width,0.5*canvas3.height,0.1*canvas3.width,0,2*Math.PI,false);
// c3.fillStyle = 'black';
// c3.fill();

// c3.arc(0.2*canvas3.width,0.5*canvas3.height,0.05*canvas3.width,0,2*Math.PI,false);

// c3.fillStyle = 'grey';
// c3.fill();
// c3.arc(0.8*canvas3.width,0.5*canvas3.height,0.05*canvas3.width,0,2*Math.PI,false);

// c3.fill();




// //speed1
// var increaseButton1 = document.getElementById('increaseButton1');
// increaseButton1.addEventListener('click',function(){speedChange(1,0.009);},false);
// var decreaseButton1 = document.getElementById('decreaseButton1');
// decreaseButton1.addEventListener('click',function(){speedChange(1,-0.009);},false);

// //speed2
// var increaseButton2 = document.getElementById('increaseButton2');
// increaseButton2.addEventListener('click',function(){speedChange(2,0.009);},false);
// var decreaseButton2 = document.getElementById('decreaseButton2');
// decreaseButton2.addEventListener('click',function(){speedChange(2,-0.009);},false);

// //speed 3
// var increaseButton3 = document.getElementById('increaseButton3');
// increaseButton3.addEventListener('click',function(){speedChange(3,0.009);},false);
// var decreaseButton3 = document.getElementById('decreaseButton3');
// decreaseButton3.addEventListener('click',function(){speedChange(3,-0.009);},false);


// //speed4

// var increaseButton4 = document.getElementById('increaseButton4');
// increaseButton4.addEventListener('click',function(){speedChange(4,0.009);},false);
// var decreaseButton4 = document.getElementById('decreaseButton4');
// decreaseButton4.addEventListener('click',function(){speedChange(4,-0.009);},false);


function calculateOrigin() {

    var width = canvas2.width;
    var height = canvas2.height;

    //calculating suitable radius
    var radius = (0.03 * width) / 2
    if (height < width) {
        radius = (0.03 * height) / 2;
    }
    //length of the propeller
    return [width, height, radius];
}

function drawStatic() {
    c.beginPath();
    c.moveTo(infoArray[0] * 0.25, infoArray[1] * 0.25);
    c.lineTo(infoArray[0] * 0.75, infoArray[1] * 0.75);
    c.lineTo(infoArray[0] * 0.75 - 5, infoArray[1] * 0.75 + 5);
    c.lineTo(infoArray[0] * 0.25 - 5, infoArray[1] * 0.25 + 5);
    c.fill();

    c.beginPath();
    c.moveTo(infoArray[0] * 0.25, infoArray[1] * 0.75);
    c.lineTo(infoArray[0] * 0.75, infoArray[1] * 0.25);
    c.lineTo(infoArray[0] * 0.75 + 5, infoArray[1] * 0.25 + 5);
    c.lineTo(infoArray[0] * 0.25 + 5, infoArray[1] * 0.75 + 5);
    c.fill();

    c.beginPath();
    c.arc(infoArray[0] * 0.5, infoArray[1] * 0.5, infoArray[2] * 10, 0, 2 * Math.PI, false);
    c.fill();
}

function reposition() {
    infoArray = calculateOrigin(); //finding center
    //set center to origin

    c.clearRect(0, 0, canvas2.width, canvas2.height);
    //draw box and lines
    drawStatic();

    c.save();
    c.translate(infoArray[0] * 0.25, infoArray[1] * 0.25);
    c.rotate(angle1);
    drawingRandomShit();
    c.restore();

    c.save();
    c.translate(infoArray[0] * 0.75, infoArray[1] * 0.75);
    c.rotate(angle4);
    drawingRandomShit();
    c.restore();


    c.save();
    c.translate(infoArray[0] * 0.75, infoArray[1] * 0.25);
    c.rotate(angle2);
    drawingRandomShit();
    c.restore();

    c.save();
    c.translate(infoArray[0] * 0.25, infoArray[1] * 0.75);
    c.rotate(angle3);
    drawingRandomShit();
    c.restore();
}


var inited = false;
var angle1 = 0.005;
var angle2 = 0.005;
var angle3 = 0.005;
var angle4 = 0.005;
var speedControl1 = 0.045;
var speedControl4 = 0.045;
var speedControl2 = 0.045;
var speedControl3 = 0.045;
var infoArray = [];
init();

function init() {
    inited = true;
    window.requestAnimationFrame(animate);
}

function drawingRandomShit() {
    c.save();
    c.beginPath();
    c.arc(0, 0, 10, 0, Math.PI * 2, false);
    c.fill();
    c.moveTo(0, 0);
    c.lineTo(0, 50);
    c.lineTo(50, 100);
    c.fill();

    c.rotate(Math.PI);
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(0, 50);
    c.lineTo(50, 100);
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