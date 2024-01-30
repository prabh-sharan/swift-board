let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mousedown = false;

let tool = canvas.getContext("2d");

tool.strokeStyle = "red";
tool.lineWidth = "3";

//mousedown -> begin new path , mousemove-> fill stroke color 
canvas.addEventListener("mousedown", (e)=> {
    mousedown = !mousedown;
    tool.beginPath(); //new path
    tool.moveTo(e.clientX,e.clientY); // start pt
    
})

canvas.addEventListener("mousemove", (e)=> {
    mousedown = !mousedown;
    if(mousedown){
        tool.lineTo(e.clientX,e.clientY); //end pt
        tool.stroke();  //fill color   
    }
})