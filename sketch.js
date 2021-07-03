//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;


function preload()
{
	//load images here
  dogIMG = loadImage("images/dogImg.png");
  dogIMG1 = loadImage("images/dogImg.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);

dogSprite=createSprite(250,300,10,10);
dogSprite.addImage(dogIMG);  
dogSprite.scale=0.2;

foodStock=database.ref('Food');
foodStock.on("value",readStock);
textsize(20);
  
}


function draw() {  
background(46,139,87);
  drawSprites();
  //add styles here
dogSprite.display();

if(keyWentDown(UP_ARROW)) {
  writeStock(foodS);
  dogSprite.addImage(dogIMG1);
}
fill(255,255,254);
stroke("black");
text("Food remaining : "+foodS,170,200);
textSize(13);
text("Note: Press UP_ARROW Key  To feed Bitu MILK!" , 130,10,300,20);


function readStock(data){
  foodS=data.val();
}

function writeStock(x) {
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
}



