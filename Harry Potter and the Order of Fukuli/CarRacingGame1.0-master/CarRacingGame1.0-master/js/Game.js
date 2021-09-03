class Game {
  constructor(){

  }
 //there are two types of functions- getters and setters;
 //this is a getter function
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  //this is a setter function
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    

    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    harry = createSprite(width - 500,height/2 - 100);
    harry.addImage("Harry", harryImg);
    harry.scale = 0.3;

    draco = createSprite(width - 500,height/2 + 100);
    draco.addImage("Draco", dracoImg);
    draco.scale = 0.3;

    players = [harry, draco];

  }

  play(){
    
    Player.getPlayersInfo();
/*
    player.getPlayersAtEnd();
    */
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(ciel, 500, 0, displayWidth*8, displayHeight - 50);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      // this (in) is called for each loop
      //The for/in statement loops through the properties of an object.
      //The block of code inside the loop will be executed once for each property.

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        //y = y + 1200;
        //use data form the database to display the cars in y direction
        var x = width - allPlayers[plr].positionX;
        var y = allPlayers[plr].positionY;
        
       
        players[index-1].position.x = x;
        players[index-1].position.y = y;

        if (index === player.index){
          
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          
          //players[index-1].shapeColor = "red";
          //camera.position.y = displayHeight/2;
          camera.position.x = players[index-1].position.x;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }


    }

    /*
    if(player.distance > 3860){
      gameState = 2;
      player.rank+=1;
      Player.updatePlayersAtEnd(player.rank);
    }
    */
    this.handlePlayerControls();
    this.spawnObstacles();
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank)
  }

  handlePlayerControls() {
    
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      //console.log("condition satisfied")
      player.positionX -=10;
      if(player.index === 1) {
        player.positionY = height/2 - 150
      }
      else if(player.index ===2) {
        player.positionY = height/2 + 150
      }
      player.updatePlayerDistanceAndRank(player.index);
    }
  }
  spawnObstacles() {
    if(frameCount%75 === 0){
    var obstacle = createSprite(frameCount*10, 100, 20, 20);
    obstacle.y = Math.round(random(85, 540))
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    harry.depth = obstacle.depth;
    harry.depth = harry.depth+1;
    draco.depth = obstacle.depth;
    draco.depth = draco.depth+1;
    var rand = Math.round(random(1,3));
      if(rand === 1) {
        obstacle.addImage(bludgerImg);
        obstacle.scale = 0.3;
        //obstacle.debug = true;
        obstacle.setCollider("circle",-2,20,100)
      }
     if(rand === 2) {
      obstacle.addImage(quaffleImg)
      obstacle.scale = 0.3;
      //obstacle.debug = true;
      obstacle.setCollider("circle",-2,20,100)
      }
    if(rand === 3) {
      obstacle.addImage(dementorImg)
      obstacle.scale = 0.9;
      //obstacle.debug = true;
      obstacle.setCollider("circle",-2,20,100)
    }
      
      obstacleGroup.add(obstacle)
      
    }
  }
  
}