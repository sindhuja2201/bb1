var PLAY =1;
var END = 0;
var gameState = PLAY;
var bow , arrow,  scene, wall;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;

var score=0;

function preload()
{
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}



function setup() 
{
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5

  wall = createSprite(400,200,20,400);
  wall.visible=false;
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  redB = new Group();
  blueB = new Group();
  greenB = new Group();
  pinkB = new Group();
  arrowGroup = new Group();
   score = 0    
}

function draw() 
{
 background(0);
 if(gameState === PLAY)
 {
  // moving ground
  scene.velocityX = -3 

  //moving bow
  bow.y = World.mouseY

  var select_balloon = Math.round(random(1,4));

  if (scene.x < 0)
  {
    scene.x = scene.width/2;
  }

  if (keyDown("space")) 
  {
    createArrow();
    
  }
  
  if (World.frameCount % 100 == 0) 
  {
    if (select_balloon == 1) 
    {
      redBalloon();
    } else if (select_balloon == 2) 
    {
      greenBalloon();
    } else if (select_balloon == 3) 
    {
      blueBalloon();
    } else 
    {
      pinkBalloon();
    }
  }  
   if(arrowGroup.isTouching(redB))
   {
     redB.destroyEach();
     arrowGroup.destroyEach();
     score=score+1;
   } 
   if(arrowGroup.isTouching(pinkB))
   {
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    score=score+2;
  } 
  if(arrowGroup.isTouching(blueB))
  {
    blueB.destroyEach();
    arrowGroup.destroyEach();
    score=score+3;
  } 
  if(arrowGroup.isTouching(greenB))
  {
    greenB.destroyEach();
    arrowGroup.destroyEach();
    score=score+4;
  } 
 }
 if(redB.isTouching(wall)||greenB.isTouching(wall)||pinkB.isTouching(wall)||blueB.isTouching(wall)){
  gameState=END;

 }
 else if(gameState === END)
 {
  background(0);
 bow.destroy();
 textSize(20)
 text("You lost :(",100,200);
 text("Game made by sindhuja",100,150)
 } 



  drawSprites();

  textSize(20);
  text("Score: "+ score, 300,50);

}


// Creating  arrows for bow
 function createArrow() 
 {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
}

function redBalloon() 
{
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() 
{
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() 
{
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() 
{
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
}

function spawnBalloons()
{
 if(frameCount % 60 === 0)  
 {
 balloon = createSprite(random(50,400),40,10,10);
 balloon.velocityX = 6;
 //generate random balloons
 var rand = Math.round(random(1,6));
 switch(rand)
{
 case 1: balloon.addImage(blue_balloonImage);
 break;
 case 2: balloon.addImage(green_balloonImage); 
 break;
 case 3: balloon.addImage(pink_balloonImage); 
 break;
 case 4: balloon.addImage(red_balloonImage); 
 break;
 default: break;
 }
 //assign scale and lifetime to the balloon
 balloon.scale = 0.5;
 balloon.lifetime = 150;
 arrow.lifetime= 150;
 } 
}