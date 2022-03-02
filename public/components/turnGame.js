import Winner from "./findWinner.js";


class Turn{
  
static findWinner(currentColor){
    let spaceCards=[];
    let cardsOfRound=document.querySelectorAll('.space-card');
    cardsOfRound.forEach((element)=>{
    spaceCards.push(element.data)
    })  
    let winnerRound= Winner.findWinner(currentColor,spaceCards)
    return winnerRound;
}

}


export default Turn