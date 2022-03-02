import DomAccess from "./DomAccess.js";


class GuessPop extends DomAccess {

constructor(container,classStyle,backgroundCon){
super();    
this.container=container;
this.classStyle=classStyle
this.backgroundCon=backgroundCon;
}


display(){
 super.display(this.backgroundCon,this.classStyle);
 super.display(this.container,this.classStyle);
};
    

disappearPop(){
super.disappearPop(this.backgroundCon,this.classStyle);
super.disappearPop(this.container,this.classStyle);
};




}





export default GuessPop