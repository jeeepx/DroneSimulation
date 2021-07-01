var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    reposition();
});
//speed1
var increaseButton1 = document.getElementById('increaseButton1');
increaseButton1.addEventListener('click',function(){speedChange(1,0.009);},false);
var decreaseButton1 = document.getElementById('decreaseButton1');
decreaseButton1.addEventListener('click',function(){speedChange(1,-0.009);},false);

//speed2
var increaseButton2 = document.getElementById('increaseButton2');
increaseButton2.addEventListener('click',function(){speedChange(2,0.009);},false);
var decreaseButton2 = document.getElementById('decreaseButton2');
decreaseButton2.addEventListener('click',function(){speedChange(2,-0.009);},false);

//speed 3
var increaseButton3 = document.getElementById('increaseButton3');
increaseButton3.addEventListener('click',function(){speedChange(3,0.009);},false);
var decreaseButton3 = document.getElementById('decreaseButton3');
decreaseButton3.addEventListener('click',function(){speedChange(3,-0.009);},false);


//speed4

var increaseButton4 = document.getElementById('increaseButton4');
increaseButton4.addEventListener('click',function(){speedChange(4,0.009);},false);
var decreaseButton4 = document.getElementById('decreaseButton4');
decreaseButton4.addEventListener('click',function(){speedChange(4,-0.009);},false);


function calculateOrigin() {

    var width = canvas.width;
    var height = canvas.height;

    //calculating suitable radius
    var radius = (0.03 * width) / 2
    if (height < width) {
        radius = (0.03 * height) / 2;
    }
    //length of the propeller
    return [width,height,radius];
}
function reposition(){
    infoArray = calculateOrigin();//finding center
    //set center to origin
    c.clearRect(0,0,canvas.width, canvas.height);
    c.save();
    c.translate(infoArray[0]*0.25,infoArray[1]*0.25);
    c.rotate(angle1);
    drawingRandomShit();
    c.restore();
    
    c.save();
     c.translate(infoArray[0]*0.75,infoArray[1]*0.75);
     c.rotate(angle4);
     drawingRandomShit();
    c.restore();  


    c.save();
     c.translate(infoArray[0]*0.75,infoArray[1]*0.25);
     c.rotate(angle2);
     drawingRandomShit();
    c.restore();  

    c.save();
     c.translate(infoArray[0]*0.25,infoArray[1]*0.75);
     c.rotate(angle3);
     drawingRandomShit();
    c.restore();  
}


var inited = false;
var angle1 =0.005;
var angle2 =0.005;
var angle3 =0.005;
var angle4 =0.005;
var speedControl1 = 0.005;
var speedControl4 = 0.005;
var speedControl2 = 0.005;
var speedControl3 = 0.005;
var infoArray = [];
init(); 

function init(){
    inited =true;
    window.requestAnimationFrame(animate);
}

function drawingRandomShit(){
    c.save();
    c.beginPath();
    c.arc(0, 0, 20, 0, Math.PI * 2, false);
    c.fill();
    c.moveTo(0,0);
    c.lineTo(0,100);
    c.lineTo(100,200);
    c.fill();

    c.rotate(Math.PI);
    c.beginPath();
    c.moveTo(0,0);
    c.lineTo(0,100);
    c.lineTo(100,200);
    c.moveTo(0,0);
    
    c.fill();
    c.restore();
}


function animate(){
    reposition();
    angle1+=speedControl1;
    angle4+=speedControl4;

    angle2-=speedControl2;
    angle3-=speedControl3;


    requestAnimationFrame(animate);
}

function speedChange(propellerNo, factor){
    if(propellerNo ===1){
        speedControl1+=factor;
    }
    else if(propellerNo ===4){
        speedControl4+=factor;
    }
    else if(propellerNo===2){
        speedControl2+=factor;
    }
    else if(propellerNo===3){
        speedControl3+=factor;
    }

}








