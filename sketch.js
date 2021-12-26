var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var girl,girl_running,girl_collided,girlImage,zombie,zombie_running,zombie_attack;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;
var ground2;

function preload(){
ground_image=loadImage("Background.png");
  girl_running=loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png","Run (11).png","Run (12).png","Run (14).png","Run (15).png","Run (16).png","Run (17).png","Run (18).png","Run (19).png","Run (20).png");
  zombie_running=loadAnimation("Walk (1).png","Walk (2).png","Walk (3).png","Walk (4).png","Walk (5).png","Walk (6).png","Walk (7).png","Walk (8).png","Walk (9).png","Walk (10).png");
  zombie_attack=loadAnimation("Attack (2).png","Attack (3).png","Attack (4).png","Attack (5).png","Attack (6).png","Attack (7).png","Attack (8).png");
  obstacle1=loadImage("obstacle4.png");
  zombie_idle=loadImage("Stand.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  gameOverImage=loadImage("gameOver1.png");
  restartImage=loadImage("restart1.png");
  girl_collided=loadImage("Dead (30).png");
  girlImage=loadImage("Idle (1).png");
}

function setup() {
 createCanvas(1000,700);
  
ground=createSprite(-500,0,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=2.2;
   ground.velocityX=-3;

  
   girl=createSprite(270,20,600,10);
  girl.addAnimation("girl_running",girl_running);
  girl.addImage("girl_collided",girl_collided);
  girl.addImage("girlImage",girlImage);
  girl.scale=0.25;
  girl.velocityX=1;
  girl.debug=false;
  girl.setCollider("rectangle",0,0,girl.width,girl.height)
  
  
  zombie=createSprite(80,20,600,10);
  zombie.addAnimation("zombie_running",zombie_running);
  zombie.addAnimation("zombie_attack",zombie_attack);
  zombie.addImage("zombie_idle",zombie_idle);
  zombie.scale=0.4;
  zombie.velocityX=1;
  zombie.debug=false;
 // zombie.velocityY=-13;
 // zombie.velocityX=Math.round(random(1,2));
  
  invisible_ground=createSprite(300,690,1500,10);
  invisible_ground.shapeColor="Black"
  invisible_ground.visible=true;
   
   gameOver = createSprite(500,350);
  gameOver.addImage(gameOverImage);
  gameOver.scale=1;
  
  restart = createSprite(500,270);
  restart.addImage(restartImage);
  restart.scale=1.5;
  
  obstaclesGroup=new Group();
  
  score=0;
}

function draw() {
 background("black");
  
 // console.log(girl.y);
   //Gravity
girl.velocityY = girl.velocityY + 0.8;
girl.collide(invisible_ground); 
  
   //Gravity
zombie.velocityY = zombie.velocityY + 0.8;
zombie.collide(invisible_ground); 
  
  
   if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
    //  zombie.y=girl.y;
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   if (obstaclesGroup.isTouching(zombie)){
     zombie.velocityY=-12;
   }
 ground.velocityX = -(2 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
 if((keyDown("space")&& girl.y >= 220)) {
   girl.velocityY = -18;
    jumpSound.play();
  }  
  
  if (girl.isTouching(obstaclesGroup)){
    gameState=END;
     dieSound.play();
  }
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     girl.velocityY = 0;
     girl.velocityX = 0;
    girl.changeImage("girlImage",girlImage);
  zombie.changeAnimation("zombie_attack",zombie_attack);
  zombie.velocityX=0;
     zombie.x=girl.x;
  if (zombie.isTouching(girl)) {
    girl.changeImage("girl_collided",girl_collided);
    zombie.changeImage("zombie_idle",zombie_idle);
  }
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
 
  drawSprites();
  fill("lightpink");
  textSize(40);
   text("Score= "+ score , 370,100);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
girl.changeAnimation("girl_running",girl_running);
girl.x=270;
  obstaclesGroup.destroyEach();
 score=0;
  zombie.x=80;
  zombie.changeAnimation("zombie_running",zombie_running);
}

function spawnObstacles() {
   if (frameCount % 90 === 0){ 
   var obstacle = createSprite(600,650,20,50);
   obstacle.velocityX = -8 ;//+ score/100);
   
    //generate random obstacles 
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.18;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}

