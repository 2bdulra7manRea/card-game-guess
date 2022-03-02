



export default class DomAccess{
            
        display(container,classStyle){
        container.classList.remove(classStyle)    
        };
        
        disappearPop(container,classStyle){
        container.classList.add(classStyle)   
        };
        
        
        getValue(div){
        const valueGuessForPlayer=div.target.textContent
        return valueGuessForPlayer
        };
        
        
        addButtons(value ,containerButtons){
            let btn=document.createElement('button');
            btn.textContent=value;
            containerButtons.appendChild(btn)
        };
        
        
        addEvents(){
        
        
        
        }
}