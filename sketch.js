const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird,bird2,bird3,bird4, slingshot;
var score;
var birdsArray=[];


var gameState = "onSling";

function preload() {
    receiveTime();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    score=0;

    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);
    

    bird = new Bird(200,50);
    bird2=new Bird(150,170);
    bird3=new Bird(100,170);
    bird4=new Bird(50,170);

    birdsArray.push(bird4)
    birdsArray.push(bird3)
    birdsArray.push(bird2)
    birdsArray.push(bird)

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);

    noStroke();
    textSize(25);
    fill("white");
    text("Score:"+score,width-300,50);
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    bird2.display();
    bird3.display();
    bird4.display();

    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birdsArray[birdsArray.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(birdsArray[birdsArray.length-1].body,birdsArray[birdsArray.length-1].body.position,{x:5,y:-5}) };
        return false
}


function mouseReleased(){
    slingshot.fly();
    birdsArray.pop()
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && gameState==="launched" ){
        if(birdsArray.length>=0){
            bird.trajectory=[];
            Matter.Body.setPosition(birdsArray[birdsArray.length-1].body, {x: 200 , y: 50});
            slingshot.attach(birdsArray[birdsArray.length-1].body);
            gameState="onSling";
        }
        
    }
}

async function receiveTime(){
    var answer=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");

    var answerJson=await answer.json();

    var date=answerJson.datetime;

    var hour=date.slice(11,13);

    if (hour>=06 && hour<=18){
        backgroundImg = loadImage("sprites/bg.png");
    }   else{
        backgroundImg = loadImage("sprites/bg2.jpg");
    }
}