


class Player {


score=0;
turn=0;
guess=0;



// find target player 

constructor(name,play) {
this.name=name;
this.play=play
}





static allPlayersPlayed(players){
    return players.every((player)=> player.played)
}


static isPlayed(players,player){
    for (let v = 0; v < players.length; v++) {
        if(players[v].name===player.name){
          players[v].played=player.played
        }
      }      
}

static findTargetPlayer(players){
let x=players.filter((player)=>{
return player.played===false
})
// console.log('[players-not-played-yet]',x)
}


static restartPlayers(players){
    for (let y = 0; y < players.length; y++) {
        players[y].played=false
      }
}

static switchPlayersFollow(players){
if(!players[0].played){
return players[0];
}else{
for (let i = 0; i < players.length; i++) {
  if(!players[i].played){
    return players[i]
  }
}
}
}


}



export default Player