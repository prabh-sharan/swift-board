let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouseDown = false;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");

let penColor = "red";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let eraserColor = "white";

let tool = canvas.getContext("2d");

tool.strokeStyle = penColor; 
tool.lineWidth = penWidth;

//mousedown -> begin new path , mousemove-> fill stroke color 
canvas.addEventListener("mousedown", (e)=> {
    mouseDown = !mouseDown;
    beginPath({
        x: e.clientX,
        y: e.clientY
    })
    
})

canvas.addEventListener("mousemove", (e)=> {
    if(mouseDown) drawStroke({
        x: e.clientX,
        y: e.clientY
    })  
    
})

canvas.addEventListener("mouseup", (e)=>{
     mouseDown =!mouseDown;
})

function beginPath(strokeObj){
    tool.beginPath(); //new path
    tool.moveTo(strokeObj.x,strokeObj.y); // start pt
}
function drawStroke(strokeObj){
    tool.lineTo(strokeObj.x,strokeObj.y); //end pt
    tool.stroke();  //fill color   
}

// accessing colors and using click event listener
pencilColor.forEach((colorElem) =>{
    colorElem.addEventListener("click", (e) =>{
        let color = colorElem.classList[0];
        // console.log(color)
        penColor = color;
        tool.strokeStyle = penColor;
    })
})