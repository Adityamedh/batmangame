
 var raindrops = [];
 var batman;
var thunder,thunderimg;


var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;
var backgroundimage;
var Bcakgaround;
var rainimage;


function preload(){
  rainimage = loadImage("raindrop.png")

  thunderimg = loadImage("thunder1.png"); 
  thunderimg2 = loadImage("thunder2.png");

  trex_running =   loadAnimation("bat.png");
  trex_collided = loadAnimation("ef.png");
  backgroundimage = loadImage("images1.png")
  
  groundImage = loadImage("roadar.jpg");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("pond1.jpg.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("ob3.png");
  obstacle4 = loadImage("f.png.png");
  obstacle5 = loadImage("x.png");
  obstacle6 = loadImage("z.png");
  
  gameOverImg = loadImage("gameover");
  restartImg = loadImage("restart.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3"); 
}

function setup() {
  
 var canvas =  createCanvas(600, 600);
  Bcakground = createSprite(300,300,600,600);
  Bcakground.addImage("Bcakground",backgroundimage)
  Bcakground.scale = 2.5;
  
  thunder = createSprite(600,5,10,40);
  thunder2 = createSprite(250,2,10,10);
  
  ground = createSprite(200,500,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  trex = createSprite(50,500,50,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 1.0;


  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 3.0;
  
  restart = createSprite(300,200);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,508,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  
  
  score = 0;
}

function modelLoaded(){
console.log('Model Loaded');
}

function gotPoses(results){
if(results.length>0){
console.log("noseX ="+noseX + "noseY ="+noseY)
noseX = results[0].pose.nose.x;
noseY = results[0].pose.nose.y;
}

}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);

  if (frameCount % 10 === 0) {
    var cloud = createSprite(300,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(rainimage);
    cloud.scale = 0.1;
    cloud.velocityY = 30;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  if (frameCount % 1 === 0) {
    var rando = random((1,600))
    var cloud = createSprite(200,rando,40,10);
    cloud.x = Math.round(random(0,600));
    cloud.addImage(rainimage);
    cloud.scale = 0.1;
    cloud.velocityY = 30;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;

    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  if (frameCount % 5 === 0) {
    var cloud = createSprite(100,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(rainimage);
    cloud.scale = 0.1;
    cloud.velocityY = 30;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("space")&&trex.y>400) {
      
      trex.velocityY = -24;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    
    if (score>0 && score%100 === 0){
      
    }
  
    if(obstaclesGroup.isTouching(trex)){
      
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,500,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
