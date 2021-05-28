//to make variables
var PLAY = 1;
var END = 0;
 var gameState = PLAY;
var backGround, backGroundImage;
var monkey , monkey_running;
var gameOver, gameOverImage;
var restart, restartImage;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var food = 0;

//to load Images & Animations in preload function
function preload(){
  //to load backGroundImage
  backGroundImage = loadImage("grass.png")
    
  //to load monkey Animation
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  //to load banana Image
  bananaImage = loadImage("banana.png");
  
  //to load obstacle Image
  obstacleImage = loadImage("obstacle.png");
 
  //to load gameOver Image
  gameOverImage = loadImage("game-over.png");
  
  //to load restart Image
  restartImage = loadImage("restartOption.jpg");
  
  //to load monkey jumping sound 
monkey_jumping_sound = loadSound("monkey_jump_sound.wav");

//to load collecting sound
banana_collecting_sound =loadSound("collecting_sound.wav")
}




//to createCanvas & createSprites in setup function
function setup() {
  //to createCanvas
createCanvas(displayWidth, displayHeight-114);
  
  //to create backGround
  backGround = createSprite(displayWidth-680, displayHeight-355);
  backGround.addImage(backGroundImage);
  backGround.velocityX = -3;
 backGround.scale = 3.2 

  
  //to create a backGround_1 to collide monkey 
  backGround_1 = createSprite(displayWidth-700, displayHeight-100, 1400, 10)
  
  //to create monkey
monkey = createSprite(displayWidth-1200, displayHeight-150, 10, 10)  
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  
  //to show gameOver
   gameOver = createSprite(displayWidth-700,displayHeight-500, 10, 10);
    gameOver.addImage(gameOverImage);
 
      
  //to show restart
      restart = createSprite(displayWidth-700,displayHeight-300, 10, 10);
    restart.addImage(restartImage);
   
  
    
    //to make foodGroup
  foodGroup = new Group ();
  
  //to make obstacleGroup
  obstacleGroup = new Group (); 
}

//to set commands in draw function
function draw() {
 
 background(0, 204, 255) 
    //to show backGround continuously 
  
  //to make backGround_1 invisible
backGround_1.visible = false;
if(backGround.x<0)
{
 backGround.x = backGround.width/1;
}
  
  if(gameState === PLAY)
    {
     
   
      monkey.visible = true;
    
      
  gameOver.visible = false;
    restart.visible = false;
      
    gameOver.scale = 0;
    restart.scale = 0;
  //to count Survival Time
  score = score + Math.round(frameCount/100);
    
  

  
  //to show bananas after 80 frameCount
  if(frameCount % 100 === 0)
    {
      bananas();
    }
  
  //to show stones after 300 frameCount
  if(frameCount % 200 === 0)
    {
      stones();
    }
   
  //if player "space" to monkey jumps
  if(keyDown("space")&& monkey.y>=450)
    { 
      monkey_jumping_sound.play();
     monkey.velocityY = -9; 
    }
  //to get monkey back if player jumps
  monkey.velocityY = monkey.velocityY + 0.2;
  //to collide  monkey with backGround_1
  monkey.collide(backGround_1);
  
  //if foodGroup Is Touching monkey so foodGroup destroyEach
  if(foodGroup.isTouching(monkey))
    {
      banana_collecting_sound.play();
      food = food+1;
     foodGroup[0].destroy();
    }
  
  //if obstacleGroup Is Touching monkey so game reset &  obstacleGroup destroyEach
  if(obstacleGroup.isTouching(monkey))
    {
  
      
     
      obstacleGroup.destroyEach();
      gameState = END;
    }
  }else if(gameState === END){
    foodGroup.destroyEach();
    
   backGround.velocityX = 0;

   monkey.visible = false;
    gameOver.visible = true;
    restart.visible = true;
    
    
    
      
    
    foodGroup.setVelocityXEach (0);
    obstacleGroup.setVelocityXEach (0);
    
    
    gameOver.scale = 1.0;
    restart.scale = 0.3;

    
    
  
  }
    
  if(mousePressedOver(restart))
    {
      
      reset();
    }
   
  
  //to draw sprites
  drawSprites();
  
  //to show Survival Time and banana
  textFont("Poppins");
  textSize(30);
  fill("white");
  rect(displayWidth-320, displayHeight-720,350, 30)
  rect(displayWidth-1205, displayHeight-720,200, 30)
  rect(displayWidth-805, displayHeight-765,200, 35)
  rect(displayWidth-840, displayHeight-720,280, 35)
  fill("red")
  text ("Survival Time =" + score, displayWidth-320, displayHeight-697);
  text ("Bananas =" + food, displayWidth-1200, displayHeight-697);
  text ("Made By Daksh", displayWidth-800, displayHeight-742);
 text ("Little Hungry Monkey", displayWidth-835, displayHeight-695);

  
}

//to create reset function
function reset()
{
  
  score = 0;
  food = 0;
  gameState = PLAY;
  backGround.velocityX = -3;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.visible = true
 
  
}

//to create bananas
function bananas() 
{
  banana = createSprite(1400,(Math.round(random(300, 360))), 10, 10)
  banana.addImage(bananaImage)
  banana.velocityX = -3;
  banana.lifetime = 500;
  banana.scale = 0.1;
  foodGroup.add(banana);
}

//to create stones
function stones()
{
  obstacle = createSprite(1400, 618, 10, 10)
  obstacle.addImage(obstacleImage)
  obstacle.velocityX = -3;
  obstacle.lifetime = 500;
  obstacle.scale = 0.2; 
  obstacleGroup.add(obstacle);
}