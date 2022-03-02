import Player from "./player.js";





class Game{



static start(ev,players,socket){  
socket.emit('start-game',{div:true,players:players})
}
    

static join(ev,socket,divPlayerName){
let name=prompt('Enter the Name')
if(!!name){
localStorage.setItem('player-name',name)
divPlayerName.textContent=name;
socket.emit('join-game',name)   
ev.target.classList.add('disappear')
}
 }

static end(){};
}

export default Game