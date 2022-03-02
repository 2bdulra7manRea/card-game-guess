

class DomEvents{








static add(querySelector,callBack,options,style){
let elements=document.querySelectorAll(querySelector)
elements.forEach((element)=>{
element.classList.add(style)    
console.log(element);
console.log(element.data);
element.addEventListener("click",()=>callBack(element),options) 
})
}



static remove(querySelector,callBack,options,style){
    let elements=document.querySelectorAll(querySelector)
    elements.forEach((element)=>{

    // element.removeEventListener("click",(ev)=>{callBack(element)},true)
    element.classList.remove(style)
    let elementNew=element.cloneNode(true);
    elementNew.data=element.data;
    element.replaceWith(elementNew)
    })

// for (let i = 0; i < elements.length; i++) {
//     let data={}
//     elements[i].classList.remove(style)
//     data=elements[i].data;
//     elements[i].replaceWith(elements[i].cloneNode(true))
//     console.log
//     elements[i].data=data
// }
// console.log(elements)
}








}


export default DomEvents