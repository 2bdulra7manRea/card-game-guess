import Card from "./Cards.js";


class Round{
//  clear round ;

// start round ; 


// number of the round ; 

constructor(roundsNumber ,cards , container , spaceContainer ) {
    this.roundsNumber=roundsNumber
    this.cards=cards
    this.container=container;
    this.spaceContainer=spaceContainer;
    this.currentRound=0;
    this.ending=false;
    this.starting=false;
}



clear (){

    this.spaceContainer.textContent='';
    this.container.textContent=''
};


start(){
    this.prepare()
    this.starting=true;
};


end(){
this.starting=false;
this.ending=true;
}


prepare(){
        this.clear()
         console.log('[..Launch..Round..🚀]')
        // if(this.currentRound===this.roundsNumber) {
        //    this.end()
        //     return;
        // }   
        this.currentRound++;
        let roundNumberCards=[]
        for(let x = 0 ; x < this.currentRound ; x ++){
        let random =Math.floor(Math.random()*45)

        while (roundNumberCards.some((v)=>v===random)) {
            random =Math.floor(Math.random()*45)
        }
        roundNumberCards.push(random)
        let card= new Card(this.cards[random],true,this.container)
        card.display()
        card.addClass('play-ground-card')
        }
}





}

export default Round