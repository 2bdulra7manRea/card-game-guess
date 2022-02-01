
// creating card ; 
// display card ;



class Card {
element;

constructor(info,AddListener,container) {
this.info=info;
this.AddListener=AddListener;
this.container=container;

}

display(){
this.element = this.create();
this.container.appendChild(this.element);
}

create(){
    const div = document.createElement("div")
    div.setAttribute('class','card-item')
    div.style.color=this.info.color
    if(this.AddListener){
    }
    const p = document.createElement('p');
    p.textContent=this.info.value
    
    const p2 = document.createElement('p');
    p2.textContent=this.info.value
    
    const h1= document.createElement("span");
    h1.textContent=this.info.shape

    div.appendChild(p)
    div.appendChild(h1);
    div.appendChild(p2);
    div.data=this.info;
    return div
}

addClass(className){
    this.element.classList.add(className)
}

}

export default Card