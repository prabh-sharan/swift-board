let optionsCont=document.querySelector(".options-cont");
let toolsCont=document.querySelector(".tools-cont");
let pencilToolCont=document.querySelector(".pencil-tool-cont");
let eraserToolCont=document.querySelector(".eraser-tool-cont");
let optionsFlag=true;

// true->show tools ,false->hide tools bar
optionsCont.addEventListener("click", (e)=>{
    optionsFlag=!optionsFlag;

    if(optionsFlag) openTools();
    else closeTools();
})

function openTools(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-x");
    iconElem.classList.add("fa-bars")
    toolsCont.style.display="flex"
}

function closeTools(){
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-x");
    toolsCont.style.display="none";

    pencilToolCont.style.display="none";
    eraserToolCont.style.display="none";
}