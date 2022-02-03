import PlayerCard from "./components/playerCard.js";
import Card  from "./components/Cards.js";
import RoundGame from "./components/round.js";
import CardsData from "./components/cardData.js";
import Winner from "./components/findWinner.js";
import GuessPop from "./components/guessPop.js";

const ContainerPlayers=document.querySelector('.players')
const PLAYGROUND=document.querySelector('.playground')
const SPACE =document.querySelector('.space')
let trumpColorDiv=document.querySelector('.trump-color')
let buttonsGuess=document.querySelectorAll('.btn-guess-value')
let guessPop=document.querySelector('.guess-pop')
let currentplayer=document.querySelector('.currentPlayer')
var socket = io();
let players = []
let RoundDiv=document.querySelector('.round-num')
let guessBtnsContainer=document.querySelector('.guess-btns')
const cards=CardsData.infoCards()
const guess=new GuessPop(guessPop,'show-off')
function addEventToPlay(){
    let cardsEvents=document.querySelectorAll('.card-item')
cardsEvents.forEach((element)=>{
element.addEventListener("click",()=>{pushCardToTheSpace(element)},{once:true}) 
})
}



buttonsGuess.forEach((element)=>{
element.addEventListener('click',(ev)=>{
const value= guess.getValue(ev)
localStorage.setItem('guess',value) ;
console.log(value)
guess.disappearPop()
socket.emit('add-guess',{name:localStorage.getItem('player-name') , guess:localStorage.getItem('guess')})
})
})
// function removeEventToPlay(){
// cardsEvents.forEach((element)=>{
// element.removeEventListener('click',pushCardToTheSpace)
// })
// }


socket.on('add-guess',(player)=>{
  console.log(player)
for (let y = 0; y < players.length; y++) {
  console.log(players[y].name , player.name)
  if(players[y].name===player.name){
    players[y].guess=player.guess
    console.log(players[y],'............')
  }
}
console.log(players)
let playerCardRefresher=new PlayerCard()
playerCardRefresher.refreshPlayersCard(ContainerPlayers,players)
})



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
    currentplayer.textContent=name;
  socket.emit('join-game',name)   
  }
}


document.getElementById("joinGameId").addEventListener('click',joinGame)
document.getElementById("startGameId").addEventListener('click',startRound)

function pushCardToTheSpace(div){
div.style.display="none"
div.data={...div.data,name:localStorage.getItem('player-name')}
socket.emit('push-card-in-space',div.data)
}


socket.on("start-game",(obj)=>{
if(obj.status){
    roundGame.start()
    guess.display()
    addEventToPlay()
    changeTrumpColor()
}
})


socket.on('turn-round',(data)=>{
console.log(data,'turn round')
players=data;
roundGame.start();
guess.display();
addEventToPlay()
changeTrumpColor()
RoundDiv.textContent=roundGame.currentRound;
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
console.log(winnerRound)

for (let y = 0; y < players.length; y++) {
    
    if(players[y].name===winnerRound.name){
        players[y].score+=10
    }else{
    players[y].score-=10    
    }
}
setTimeout(() => {
socket.emit('turn-round',players)    
},2000);
}


document.getElementById("winner").addEventListener("click",checkForWinnerInRound)


//todo start game 
//todo guess
//todo turn 
//todo after all turn finished the round new come 
//todo turn again





