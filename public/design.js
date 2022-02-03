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
const roundGame = new RoundGame(10,cards,PLAYGROUND,SPACE);



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

socket.on('add-guess',(player)=>{
let playerCardRefresher=new PlayerCard()
playerCardRefresher.editGuessValuePlayer(players,player)
playerCardRefresher.refreshPlayersCard(ContainerPlayers,players)
})

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

function switchPlayer(){
// handling events 
// handling name of player
}

function checkTurnIsDone(){
const flag=players.every((player)=> player.played)
console.log(players)
if(flag){
let winnerCard=findWinnerForTurn()
Winner.markWinner(winnerCard,SPACE,'winnerCard')
setTimeout(()=>{
startNewTurn()
},3000)
return true; 
}else{
  return false
}
}

function startNewTurn(){
SPACE.textContent=''
for (let y = 0; y < players.length; y++) {
  players[y].played=false
}
const childNodes=PLAYGROUND.childNodes
if(childNodes.length===0){
socket.emit('start-game',{status:true})
}
}

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
div.data={...div.data,name:localStorage.getItem('player-name'),played:true}
socket.emit('push-card-in-space',div.data)
div.remove()
}

socket.on("start-game",(obj)=>{
    roundGame.start()
    guess.display()
    addEventToPlay()
    changeTrumpColor()
    startNewTurn()
})

socket.on('turn-round',(data)=>{
console.log(data,'turn round')
players=data;
roundGame.start();
guess.display();
addEventToPlay()
changeTrumpColor()
startNewTurn()
RoundDiv.textContent=roundGame.currentRound;
let playerCardRefresher=new PlayerCard()
playerCardRefresher.refreshPlayersCard(ContainerPlayers,players)
})

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

for (let v = 0; v < players.length; v++) {
  if(players[v].name===body.name){
    players[v].played=body.played
  }
}

setTimeout(()=>{
checkTurnIsDone()
},3000)
})

function findWinnerForTurn(){
  let spaceCards=[];
  let cardsOfRound=document.querySelectorAll('.space-card');
  cardsOfRound.forEach((element)=>{
  spaceCards.push(element.data)
  })  
  let winnerRound= Winner.findWinner(CardsData.currentColor,spaceCards)
  return winnerRound;
}

function checkForWinnerInRound(){

let winnerRound=findWinnerForTurn()

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



