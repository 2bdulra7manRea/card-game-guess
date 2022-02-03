



class Winner{



// search for colors like color of trump
// if found the larger number is the winnder
// if not found : find the first card color 
// the found large number of it is the winner






static findWinner(trumpColor,data){
let largeNumber=0

let step1=this.findWinnerColor(trumpColor,data)
if(step1.length===0){
console.log('no one has trump color')
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
    console.log(color , 'inside finder winner color')
const d= data.filter((value,index)=> {return value.color===color})

console.log(d , ' players has same color of trump');


return d
}



}





export default Winner