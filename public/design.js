import PlayerCard from "./components/playerCard.js";
import Card  from "./components/Cards.js";
import RoundGame from "./components/round.js";
import CardsData from "./components/cardData.js";
import Winner from "./components/findWinner.js";

const ContainerPlayers=document.querySelector('.players')
const PLAYGROUND=document.querySelector('.playground')
const SPACE =document.querySelector('.space')
let trumpColorDiv=document.querySelector('.trump-color')
let currentplayer=document.querySelector('.currentPlayer')
var socket = io();
let players = []
let RoundDiv=document.querySelector('.round-num')

const cards=CardsData.infoCards()

function addEventToPlay(){
    let cardsEvents=document.querySelectorAll('.card-item')
cardsEvents.forEach((element)=>{
element.addEventListener("click",()=>{pushCardToTheSpace(element)},{once:true}) 
})
}



// function removeEventToPlay(){
// cardsEvents.forEach((element)=>{
// element.removeEventListener('click',pushCardToTheSpace)
// })

// }


const roundGame = new RoundGame(10,cards,PLAYGROUND,SPACE);







function startRound(ev){
socket.emit('start-game',{status:true})
ev.target.classList.add('disappear');
RoundDiv.textContent=1;
}


function changeTrumpColor(){
let color=CardsData.trumpColor()

socket.emit('trump-color',color)

}




socket.on('trump-color',(color)=>{
trumpColorDiv.textContent='turmp color : '+ color;
trumpColorDiv.style.color=color
})

// function getIndexOfCurrentPlayer(){
// if(players.length>currentPlayerIndex){
// currentPlayerIndex++;
// return currentPlayerIndex
// }
// return 200
// }


// function appearCurrentPlayer(index){

// if(players[index].name===localStorage.getItem('joiner-name')){
// currentplayer.textContent='Your turn'
// }else{
// currentplayer.textContent=players[index].name    
// }
// }



// ** when player wants to join the game
function joinGame(){
  let name=prompt('Enter the Name')
  if(!!name){
    localStorage.setItem('player-name',name)
  socket.emit('join-game',name)   
  }
}


document.getElementById("joinGameId").addEventListener('click',joinGame)
document.getElementById("startGameId").addEventListener('click',startRound)

function pushCardToTheSpace(div){
div.style.display="none"
div.data={...div.data,player:localStorage.getItem('player-name')}
socket.emit('push-card-in-space',div.data)
}


socket.on("start-game",(obj)=>{
if(obj.status){
    roundGame.start()
    addEventToPlay()
    changeTrumpColor()
}
})


socket.on('turn-round',(data)=>{
console.log(data)
roundGame.start()
addEventToPlay()
changeTrumpColor()
let playerCardRefresher=new PlayerCard()
playerCardRefresher.refreshPlayersCard(ContainerPlayers,players)
})




// ** diplay players on the menu
socket.on('join-game',(name)=>{
players.push({name:name , play:false ,score:0 , turn:0 , guess:0})
let playercard= new PlayerCard(name,0,'not-yet')
playercard.display(ContainerPlayers)
})





socket.on("user-connected",(payload)=>{

console.log(payload)

})


socket.on('push-card-in-space',(body)=>{
let card= new Card(body,false,SPACE)
card.display()
card.addClass('space-card');
})


function checkForWinnerInRound(){
let spaceCards=[];
let cardsOfRound=document.querySelectorAll('.space-card');
cardsOfRound.forEach((element)=>{
spaceCards.push(element.data)
})

let winnerRound= Winner.findWinner(CardsData.currentColor,spaceCards)

players.forEach((player)=>{
if(player.name===winnerRound.name){
player.score+=10
}
})



socket.emit('turn-round','turn to next round')

}


document.getElementById("winner").addEventListener("click",checkForWinnerInRound)


//todo start game 
//todo guess
//todo turn 
//todo after all turn finished the round new come 
//todo turn again





