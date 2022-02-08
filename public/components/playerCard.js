
class DocumentCard{


constructor() {
}




}





class PlayerCard{



constructor(name,guess,score) {
this.name=name;
this.guess=guess;
this.socre=score;
}


display(container){
this.create(container,this.name,this.guess,this.score)
}


create(container,name,guess,score,taken){
    let mainDiv = document.createElement('div');
    let subDiv = document.createElement('div');
    
    mainDiv.setAttribute('class','player-card');

    let p = document.createElement("h1");
    p.textContent=name;


    let took=document.createElement('p');
    took.textContent='and took:'

    let tookNumber=document.createElement('p');
    tookNumber.textContent=taken;


    let Guessed=document.createElement('p');
    Guessed.textContent="Guessed : "


    let GuessedNumber = document.createElement('p');
    GuessedNumber.textContent=guess;


    let scoreNumber = document.createElement('p');
    scoreNumber.textContent=score;


    

    mainDiv.appendChild(p);

    subDiv.appendChild(Guessed);
    subDiv.appendChild(GuessedNumber);
    subDiv.appendChild(took);
    subDiv.appendChild(tookNumber);
    subDiv.appendChild(scoreNumber);
    
    mainDiv.append(subDiv)
    container.appendChild(mainDiv)
}


clear(container){
container.textContent='';
}

refreshPlayersCard(container,arr){
this.clear(container)
Array.from(arr).forEach((playerDetails)=>{
this.create(container,playerDetails.name, playerDetails.guess, playerDetails.score ,playerDetails.taken)
})
}


editGuessValuePlayer(players,player){
    for (let y = 0; y < players.length; y++) {
        if(players[y].name===player.name){
          players[y].guess=player.guess
        }
      }
}


}


export default PlayerCard