class Player {
  constructor(){
    this.name = null;
    this.positionX = 20;
    this.positionY = 200;

    this.index = null;
    this.distance = 200;
    this.rank = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  //to add new player
  update(x){ 
    if(x===1){
      this.index = 1;
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
      name:"harry",
      positionY: height/2 - 150,
      positionX: this.positionX
      })
    }
    else if(x===2) {
      console.log("update from player")
      console.log(this.positionX)
      this.index = 2;
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
      name:"draco",
      positionY: height/2 + 150,
      positionX: this.positionX
      })
    }
 }

 updatePlayerDistanceAndRank(x) {
  if(x===1){
    this.index = 1;
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
    positionY: this.positionY,
    positionX: this.positionX,
    rank: this.rank
    })
  }
  else if(x===2) {
    console.log("update from player")
    console.log(this.distance)
    this.index = 2;
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
    positionY: this.positionY,
    positionX: this.positionX,
    rank: this.rank
    })
  }
 }

  
  //static function  is a public bathroom and astatic(normal) are private home bathrooms;                   
  //fetch distance of players
  static getPlayersInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
      var players = data.val();
      this.positionX = players.positionX;
      this.positionY = players.positionY;
    })
    
  }




//getter
  getPlayersAtEnd() {
    var playersAtEndRef = database.ref('playersAtEnd');
      playersAtEndRef.on("value",(data)=>{
      this.rank = data.val();
    })
  }
//setter 
//setter function always take arguments;
  static updatePlayersAtEnd(rank) {
    database.ref('/').update({
      playersAtEnd: rank
    });
  }
}