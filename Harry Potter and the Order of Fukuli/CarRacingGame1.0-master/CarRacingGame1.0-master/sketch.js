var gameState = 0;
var playerCount;
var allPlayers = null;
var distance = 100;
var database;

var player, game, form;

var ciel, harryImg, dracoImg;

var players, harry, draco, timer;

var obstacleGroup;

function preload(){
  ciel = loadImage("Bg.jpg");
  harryImg = loadImage("harry.png");
  dracoImg = loadImage("draco.png");
  bludgerImg = loadImage("bludger.png");
  quaffleImg = loadImage("quaffle.png");
  dementorImg = loadImage("dementor.png");
  timerImg = loadAnimation("1.png", "1.png", "2.png", "2.png", "3.png", "3.png");
}

function setup(){
  //canvas = createCanvas(1600,800);;
  canvas = createCanvas(1325,590)
  database = firebase.database();
  game = new Game();
  form = new Form()
  game.getState();
  game.start();
  timer = createSprite(1325/2, 250, 20, 20);
  timer.addAnimation("timerImg", timerImg);

  obstacleGroup = new Group();
}


function draw(){
  background("black")
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  if(gameState === 0){
    form.display();
  }
}