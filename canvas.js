let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouseDown = false;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let penColor = "red";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let eraserColor = "white";

let undoRedoTracker = []; // data of all actions
let track = 0; //represent which action performed

let tool = canvas.getContext("2d");
tool.strokeStyle = penColor; 
tool.lineWidth = penWidth;

//mousedown -> begin new path , mousemove-> fill stroke color 
canvas.addEventListener("mousedown", (e)=> {
    mouseDown = true;
    beginPath({
        x: e.clientX,
        y: e.clientY
    })
    
})

canvas.addEventListener("mousemove", (e)=> {
    if(mouseDown) drawStroke({
        x: e.clientX,
        y: e.clientY,
        color: eraserFlag ? eraserColor : penColor,
        width: eraserFlag ? eraserWidth :penWidth
    })  
    
})

canvas.addEventListener("mouseup", (e)=>{
    mouseDown = false;
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    // console.log(undoRedoTracker);
    track = undoRedoTracker.length - 1;  //  at last ele in array

})

undo.addEventListener("click", (e)=> {
    if(track > 0 ) track--;
    //track acation
    let trackObj ={
        trackValue : track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj);
})

redo.addEventListener("click", (e)=> {
    if( track < undoRedoTracker.length - 1 ) track++;
    // console.log(track);
   //track action 
    let trackObj ={
        trackValue : track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj);
})

function undoRedoCanvas(trackObj){
    track = trackObj.trackValue;
    undoRedoTracker =  trackObj.undoRedoTracker;
    
    let url = undoRedoTracker[track];
    let img = new Image(); // image() contructor- creates new image elem
    img.src = url;
    img.addEventListener("load", (e)=> {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height)
    })

}


function beginPath(strokeObj){
    tool.beginPath(); //new path
    tool.moveTo(strokeObj.x,strokeObj.y); // start pt
}
function drawStroke(strokeObj){
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
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

pencilWidthElem.addEventListener("input" , (e)=> {
    // console.log(pencilWidthElem.value);
    penWidth = pencilWidthElem.value;
    tool.lineWidth = penWidth;
})

// eraser 
eraserWidthElem.addEventListener("input", (e)=> {
        eraserWidth = eraserWidthElem.value;
        tool.lineWidth = eraserWidth;
})

eraser.addEventListener("click" , (e)=> {
    if(eraserFlag){
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth; 

    }else{
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth; 
    }
})

// download canvas 
download.addEventListener("click", (e)=> {
        let url = canvas.toDataURL();  // get canvas url
        let a = document.createElement("a");   
        a.href = url;
        a.download = "swift-board.jpg";
        a.click();
        // console.log(a)
})