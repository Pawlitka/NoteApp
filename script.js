const NOTES_CONTAINER = document.querySelector('.notes-container');
const CREATE_BUTTON = document.querySelector('.create-button');
const LOCAL_STORAGE_NOTES_KEY = "notes";

function getNotes() {
    return localStorage.getItem(LOCAL_STORAGE_NOTES_KEY);
}

function showNotes() {
    NOTES_CONTAINER.innerHTML = getNotes();
}
showNotes();

function updateStorage() {
    localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, NOTES_CONTAINER.innerHTML);
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
        updateStorage();
    }
    else if(e.target.tagName === "P") {
        let notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
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