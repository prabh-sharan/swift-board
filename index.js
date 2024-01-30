let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont");
let optionsFlag = true;

let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");

let sticky = document.querySelector(".sticky");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let pencilFlag = false;
let eraserFlag = false;

// true->show tools ,false->hide tools bar
optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;

    if (optionsFlag) openTools();
    else closeTools();
})

function openTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-x")
    toolsCont.style.display = "flex"
}

function closeTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-x");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "none";

    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none";
}

// true->show pencil tool , false-hide pencil tool
pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;

    if (pencilFlag) pencilToolCont.style.display = "block";
    else pencilToolCont.style.display = "none";
})

// true->show eraser tool , false-hide eraser tool features
eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;

    if (eraserFlag) eraserToolCont.style.display = "flex";
    else eraserToolCont.style.display = "none";
})

sticky.addEventListener("click", (e) => {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");

    stickyCont.innerHTML = `
            <div class="header-cont">
               <div class="minimize"></div>
               <div class="remove"></div>
            </div>
            <div class="note-cont">
               <textarea></textarea>
            </div>`;
    document.body.appendChild(stickyCont);
})