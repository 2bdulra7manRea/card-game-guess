import Card from "./Cards.js";


class Round{

currentRound=0;


//  clear round ;

// start round ; 


// number of the round ; 

constructor(roundsNumber ,cards , container , spaceContainer ) {
    this.roundsNumber=roundsNumber
    this.cards=cards
    this.container=container;
    this.spaceContainer=spaceContainer;
}



clear (){

    this.spaceContainer.textContent='';
    this.container.textContent=''
};


start(){
    this.prepare()
};



prepare(){
        this.clear()
        if(this.currentRound>=this.roundsNumber) {
            return;
        }   

        this.currentRound++;
        let roundNumberCards=[]
        //displayRoundNumber(RoundDiv,round)

        for(let x = 0 ; x < this.currentRound ; x ++){
        let random =Math.floor(Math.random()*45)

        while (roundNumberCards.some((v)=>v===random)) {
            random =Math.floor(Math.random()*45)
            console.log('while loop random number......',random)
        }
        roundNumberCards.push(random)
        let card= new Card(this.cards[random],true,this.container)
        card.display()
        }
}





}

export default Round