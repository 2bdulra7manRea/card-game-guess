import CardsData from "./cardData.js";


class Color{


static trump;



static generate(socket){
        let random=Math.floor(Math.random()*CardsData.colors.length)
        this.trump=CardsData.colors[random];
        socket.emit('trump-color',this.trump)
        return this.trump
}
        

static assign(div,color){
div.textContent=''+ color;
div.style.color=color
}



}

export default Color