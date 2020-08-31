var trex,edges,trex_running,ground,groundimage,invisibleground,cloud,cloud_img;
var cloudsgroup,obstraclegroup,obstracle1_img,obstracle2_img,obstracle3_img,obstracle4_img,obstracle5_img,obstracle6_img;
var
count,PLAY,END,gamestate,trexstop_img,trexstop,gameover,reset,gameover_img,reset_img;

function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png");
  cloud_img=loadImage("cloud.png")
  obstracle1_img=loadImage("obstacle1.png");
  obstracle2_img=loadImage("obstacle2.png");
  obstracle3_img=loadImage("obstacle3.png");
  obstracle4_img=loadImage("obstacle4.png");
  obstracle5_img=loadImage("obstacle5.png");
  obstracle6_img=loadImage("obstacle6.png");
  trexstop_img=loadAnimation("trex_collided.png");
  gameover_img=loadImage("gameOver.png");
  reset_img=loadImage("restart.png");
}

function setup(){
  createCanvas(500,500);
  trex=createSprite(200,380,20,50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  
  ground = createSprite(200,385,400,20);
  
  ground.addImage("ground",groundimage);
  ground.x=ground.width/2;
  
  invisibleground=createSprite(200,390,400,5);
  invisibleground.visible=false;
  
  trex.addAnimation("stop",trexstop_img);
  
    
  cloudsgroup=new Group();
  
  obstraclegroup=new Group();
  
  count=0;
  PLAY=1;
  END=0;
  gamestate=PLAY;
  gameover=createSprite(200,200,3,4);
  reset=createSprite(200,280,3,9);
  gameover.addImage(gameover_img);
  reset.addImage(reset_img);
  gameover.scale=0.5;
  reset.scale=0.5;
  gameover.visible=false;
  reset.visible=false;
  
}
function draw(){
  background("white");
  if(gamestate===PLAY){
    if(keyDown("space")&&trex.y>=364){
    trex.velocityY=-12;
  }
  //console.log(trex.y); 
  trex.velocityY=trex.velocityY+0.8; 
  if(ground.x<0){
    ground.x=ground.width/2;
  }
    spawnClouds();
  spawnObstacles();
  count=count+Math.round(getFrameRate()/60);
    ground.velocityX=-7;
    if(trex.isTouching(obstraclegroup)){
      gamestate=END;
      
       }
  
  }
  else if(gamestate===END){
    ground.velocityX=0;
    trex.velocityY=0;
    trex.changeAnimation("stop",trexstop_img);
    
    cloudsgroup.setVelocityXEach(0);
    obstraclegroup.setVelocityXEach(0);
    cloudsgroup.setLifetimeEach(-1);
     obstraclegroup.setLifetimeEach(-1);
  gameover.visible=true;
  reset.visible=true;
    if(mousePressedOver(reset)){
      restart();      
    }
  
    
  }
  
  trex.collide(invisibleground);
  
 text("score="+count,300,100); 
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y = random(280,320);
    cloud.addImage("cloud",cloud_img);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsgroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = - (6 + 2*count/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1 :obstacle.addImage(obstracle1_img);
             break;
      case 2 :obstacle.addImage(obstracle2_img);
             break;
      case 3 :obstacle.addImage(obstracle3_img);
             break;
      case 4 :obstacle.addImage(obstracle4_img);
             break;
      case 5 :obstacle.addImage(obstracle5_img);
             break;
      case 6 :obstacle.addImage(obstracle6_img);
             break;
    default:break;       
    }
  
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
    //add each obstacle to the group
    obstraclegroup.add(obstacle);
  }
}
function restart(){
  gamestate=PLAY;
  gameover.visible=false;
  reset.visible=false;
  
  obstraclegroup.destroyEach();
  cloudsgroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  count=0;
  
}
