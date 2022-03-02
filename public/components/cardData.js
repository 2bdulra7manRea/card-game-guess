





class CardsData{
static values=['1','2','3','4','5','6','7','8','9','10','11','12','13']
static colors=['red','green','blue','orange']
static shape="♥"
static currentColor='unknown';

static refreshCards(){
return this.colors.flatMap((color)=>{
return this.values.map((value)=>{
    return {value:value , color:color , shape:this.shape}
})
})
}
        


static infoCards(){

const cards = this.refreshCards()

return cards
}


static trumpColor(){
let random=Math.floor(Math.random()*this.colors.length)
this.currentColor=this.colors[random];
return this.currentColor
}



}

export default CardsData