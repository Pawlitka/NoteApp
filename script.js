const NOTES_CONTAINER = document.querySelector('.notes-container');
const CREATE_BUTTON = document.querySelector('.create-button');
let NOTES = document.querySelectorAll(".input-box");

function showNotes() {
    NOTES_CONTAINER.innerHTML = localStorage.getItem("NOTES");
}
showNotes()

function updateStorage() {
    localStorage.setItem("NOTES", NOTES_CONTAINER.innerHTML);
}

CREATE_BUTTON.addEventListener('click', () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    NOTES_CONTAINER.appendChild(inputBox).appendChild(img);
})

NOTES_CONTAINER.addEventListener("click", function(e) {
    if(e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage()
    }
    else if(e.target.tagName === "P") {
        NOTES = document.querySelectorAll(".input-box");
        NOTES.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event => {
    if(event.key ==="Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})