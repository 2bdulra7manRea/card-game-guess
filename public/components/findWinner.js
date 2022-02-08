



class Winner{



// search for colors like color of trump
// if found the larger number is the winnder
// if not found : find the first card color 
// the found large number of it is the winner

static getPointsScore(players){

console.log(players,'............')

for (let i = 0; i < players.length; i++) {
console.log(players[i]);

if(Number(players[i].guess)===players[i].taken){
    players[i].score+=20;
    players[i].taken=0;
    players[i].guess=0;
// get points
}else{
    players[i].score-=10
    players[i].taken=0;
    players[i].guess=0;
// remove points
}    
}
}

static arrangPlayers(players){

let arrangedPlayers=Array.from(players).sort((a,b)=>{
return  b.score-a.score
})
console.log(arrangedPlayers)
}


static assignPointsOfTaken(players,player){
for (let i = 0; i < players.length; i++) {
    if(players[i].name===player.name){
        players[i].taken+=1;
        return;
    }
}


}

static findWinner(trumpColor,data){
let largeNumber=0

let step1=this.findWinnerColor(trumpColor,data)
if(step1.length===0){

let step2=this.findWinnerColor(data[0].color,data)
let p=this.findLargeNumber(step2)
return p
}else{

let p2=this.findLargeNumber(step1)
return p2
}
}


static findLargeNumber(data){

// let largeWinnerNumber=data[0];

let x=Array.from(data).sort((a,b)=>{
    return Number(b.value)-Number(a.value)
})

return x[0];
}


static findWinnerColor(color,data){
const d= data.filter((value,index)=> {return value.color===color})
return d
}



static markWinner(winner , container , classNameStyle){ 
container.childNodes.forEach((element)=>{
if(element.data.name===winner.name && element.data.color===winner.color){
element.classList.add(classNameStyle)
}
})
}





}





export default Winner