let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont");
let optionsFlag = true;

let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");

let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");
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


upload.addEventListener("click", (e) => {
    // open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click(); /*when upload is clicked file is opened */

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        // console.log(file); console.log(url);


        let stickyHtmlTemplate = `
            <div class="header-cont">
                <div class="minimize"></div>
                <div class="remove"></div>
            </div>
            <div class="note-cont">
                <img src="${url}" />
            </div>`;
       
        createSticky(stickyHtmlTemplate);

    })

})

// sticky note
sticky.addEventListener("click", (e) => {

        let stickyHtmlTemplate = `
            <div class="header-cont">
                <div class="minimize"></div>
                <div class="remove"></div>
            </div>
            <div class="note-cont">
                <textarea spellcheck="false"></textarea>
            </div>`;
       
        createSticky(stickyHtmlTemplate);

})

function createSticky(stickyHtmlTemplate) {

        let stickyCont = document.createElement("div");
        stickyCont.setAttribute("class", "sticky-cont");

        stickyCont.innerHTML = stickyHtmlTemplate;
        document.body.appendChild(stickyCont);

        let minimize = stickyCont.querySelector(".minimize");
        let remove = stickyCont.querySelector(".remove");

        noteActions(minimize, remove, stickyCont);

        // drag and drop
        stickyCont.onmousedown = function (event) {
            dragAndDrop(stickyCont, event)
        };

        stickyCont.ondragstart = function () {
            return false;
        };

}


// Note actions- remove and minimize
function noteActions(minimize, remove, stickyCont) {

    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })

    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");

        // console.log(display);
        if (display === "block") noteCont.style.display = "none";
        else noteCont.style.display = "block";
    })

}

// Note drag and drop function
function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the note at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the note on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the note
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };

}