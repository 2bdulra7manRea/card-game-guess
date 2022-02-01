
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
    let p2 = document.createElement('p');
    p2.textContent=guess;
    let p3=document.createElement('p');
    p3.textContent=turn
    let p4=document.createElement('p');
    p4.textContent=score
    div.appendChild(p);
    div.appendChild(p3);
    div.appendChild(p2);
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


}


export default PlayerCard