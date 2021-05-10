var tower , Tower;
var door , Door, doorsGroup;
var climber , Climber , climbersGroup;
var ghost , Ghost;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  Tower = loadImage("tower.png");
  
  Door = loadImage("door.png");
  
  doorsGroup = new Group();  
  
  Climber = loadImage("climber.png");
  
  climbersGroup = new Group();
  
  Ghost = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
}



function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",Tower);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",Ghost);
 
  invisibleBlockGroup = new Group();
  
  //spookySound.loop();
}

     
function draw(){
  background(0);
  
  if (gameState === "play") {
  
 if(tower.y>400){
    tower.y = 300;
  }

  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -8; 
  }
  
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
    
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){             ghost.destroy(); 
      gameState = "end" 
      }                                                         
  
  spwanDoors();
    
  drawSprites();
  
  }

  if (gameState === "end"){ 
    stroke("yellow"); fill("yellow"); textSize(30); text("Game Over", 230,250) 
      }
  
}



function spwanDoors(){
  
  if(frameCount%240 === 0){
    door = createSprite(200,-50);
    door.addImage(Door);
    
    climber = createSprite(200,10);
    climber.addImage(Climber);
  
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    door.velocityY = 1;

    
    climber.x = door.x;
    climber.velocityY = 1; 
    
    invisibleBlock.x = door.x;
    invisibleBlock.lifetime = 800;
    
    ghost.depth = door.depth;
    ghost.depth += 1;
    
    climber.lifetime = 800;
    climbersGroup.add(climber);
          
    door.lifetime = 800;
    
    doorsGroup.add(door);
    
    invisibleBlockGroup.add(invisibleBlock);
  }
  
}