import PlayerCard from "./components/playerCard.js";
import Card  from "./components/Cards.js";
import RoundGame from "./components/round.js";
import CardsData from "./components/cardData.js";
import Winner from "./components/findWinner.js";
import GuessPop from "./components/guessPop.js";
import Player from "./components/player.js";
import DomEvents from "./components/DomEvents.js";
import Turn from "./components/turnGame.js";
import Game from "./components/Game.js";
import Color from "./components/Color.js";
const ROUND_NUMBERS=2;
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
let startButtonGame=document.getElementById("startGameId");
let guessBtnsContainer=document.querySelector('.guess-btns')
const cards=CardsData.infoCards()
const guess=new GuessPop(guessPop,'show-off')
const roundGame = new RoundGame(ROUND_NUMBERS,cards,PLAYGROUND,SPACE);
document.getElementById("joinGameId").addEventListener('click',(ev)=>Game.join(ev,socket,currentplayer))
startButtonGame.addEventListener('click',(ev)=>Game.start(ev,players,socket))
let index=0;

socket.on("user-connected",(payload)=>{
})

buttonsGuess.forEach((element)=>{


element.addEventListener('click',(ev)=>{
const value= guess.getValue(ev)
localStorage.setItem('guess',value) ;
guess.disappearPop()
socket.emit('add-guess',{name:localStorage.getItem('player-name') , guess:localStorage.getItem('guess')})
})
})

socket.on('add-guess',(player)=>{
let playerCardRefresher=new PlayerCard()
playerCardRefresher.editGuessValuePlayer(players,player)
playerCardRefresher.refreshPlayersCard(ContainerPlayers,players)
})

socket.on('players-switch',(nextPlayer)=>{
if(nextPlayer.name===localStorage.getItem('player-name')){
 console.log('add event') 
DomEvents.add('.play-ground-card',pushCardToTheSpace,{once:true},'active-card')
}else{
console.log('remove-event')
DomEvents.remove('.play-ground-card',pushCardToTheSpace,{once:true},'active-card')
}
})




socket.on('trump-color',(color)=>{
Color.assign(trumpColorDiv,color)
})

socket.on('join-game',(name)=>{
  if(players.length===0){
    players.push({name:name , play:false ,host:true,score:0 , turn:0 , guess:0})
  }else{
   players.push({name:name , play:false ,host:false,score:0 , turn:0 , guess:0}) 
  }
let playercard= new PlayerCard(name,0,'not-yet')
playercard.display(ContainerPlayers)
})


//  ? ----------------------------------------All Logic-------------------------------------



// (3)
function checkTurnIsDone(){
// console.log('[check-for-done]')  
  // ! work at each push of card
const flag=Player.allPlayersPlayed(players)
if(flag){
let winnerCard=Turn.findWinner(trumpColorDiv.style.color)
Winner.markWinner(winnerCard,SPACE,'winnerCard')
setTimeout(()=>{
startNewTurn()
},3000)
return true; 
}else{
  return false
}
}

// (4)
function startNewTurn(){

  // ! work when all players in turn done
SPACE.textContent=''
Player.restartPlayers(players)
const childNodes=PLAYGROUND.childNodes

if(childNodes.length===0){
  if(roundGame.currentRound<ROUND_NUMBERS){
    if(players[0].name===localStorage.getItem('player-name')){
      console.log('host')
    socket.emit('start-game',players)
    }
  }else{
    console.log('The Game is end')
  }
}
}

function pushCardToTheSpace(div){
div.data={...div.data,name:localStorage.getItem('player-name'),played:true}
socket.emit('push-card-in-space',div.data)
div.remove()
}


// (1)
socket.on("start-game",(dataSocket)=>{

  if(!!dataSocket && !!dataSocket.players){
  Player.restartPlayers(dataSocket.players)
  startButtonGame.classList.add('disappear');
  }
    roundGame.start();
    RoundDiv.textContent=roundGame.currentRound;
    guess.display()
    Color.generate(socket);
    findWhoWillPlayNext()
})


function findWhoWillPlayNext(){
if(players[0].name===localStorage.getItem('player-name')){
let nextPlayer=Player.switchPlayersFollow(players)
if(!!nextPlayer){
socket.emit('players-switch',nextPlayer)  
}
}
}









//(2)
socket.on('push-card-in-space',(body)=>{
console.log('...push..')
let card= new Card(body,false,SPACE)
card.display()
card.addClass('space-card');
Player.isPlayed(players,body)
setTimeout(()=>{
findWhoWillPlayNext();
checkTurnIsDone()
// console.log('[switch]...')
},3000)
})





// todo host + dict