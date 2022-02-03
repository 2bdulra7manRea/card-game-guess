
class DocumentCard{


constructor() {
}




}





class PlayerCard{



constructor(name,guess,turn) {
this.name=name;
this.guess=guess;
this.turn=turn;
}


display(container){
this.create(container,this.name,this.guess,this.turn)
}


create(container,name,guess,turn,score=0){
    let div = document.createElement('div');
    div.setAttribute('class','player-card')
    let p = document.createElement('p');
    p.textContent=name;

    let p2=document.createElement('p');
    p2.textContent=score
    let p3=document.createElement('p');
    p3.textContent="guess : "
    p3.style.color='gray'
    let p4 = document.createElement('p');
    p4.textContent=guess;
    div.appendChild(p);
    div.appendChild(p2);
    div.appendChild(p3);
    div.appendChild(p4);
    container.appendChild(div)
}


clear(container){
container.textContent='';
}

refreshPlayersCard(container,arr){
this.clear(container)
Array.from(arr).forEach((playerDetails)=>{
this.create(container,playerDetails.name, playerDetails.guess, playerDetails.turn ,playerDetails.score)
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