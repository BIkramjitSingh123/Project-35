var dog,dogimg,happydogimg,database,foods,foodstock;
var database;

function preload(){
  happydogimg = loadImage("dogImg.png");
  dogimg = loadImage("dogImg1.png");
}

function setup(){
  createCanvas(700, 600);
  database = firebase.database();
  dog = createSprite(300,300);
  dog.addImage("dog",dogimg);
  dog.scale = 0.5;
  foodstock = database.ref('Food');
  foodstock.on("value",readStock);
}

function readStock(data){
  foods = data.val()
}

function writeStock(x){
  if(x <= 0){
    x = 20
  }
  else{
    x = x - 1 
  }
  database.ref('/').update(
    {
      Food:x
    }
  )
}

function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foods)
    dog.addImage("dog",happydogimg);
  } 
  fill("black");
  textSize(30);
  text("Treats Available:" + foods,200,500);
  drawSprites();

  fill("black");
  textSize(30);
  text("Press the Up arrow to give Tommy Treats",80,120);
}


