const NOTES_CONTAINER = document.querySelector('.notes-container');
const CREATE_BUTTON = document.querySelector('.create-button');
const LOCAL_STORAGE_NOTES_KEY = "notes";

const DELETE_IMAGE_SOURCE = 'images/delete.png';

function handleCreateNote() {
    let noteBlock = prepareNoteElement();
    NOTES_CONTAINER.appendChild(noteBlock);
}

function prepareNoteElement() {
    const img = createDeleteImageElement()

    let inputBox = createInputBoxElement()
    inputBox.appendChild(img);

    return inputBox;
}

function createDeleteImageElement() {
    let img = document.createElement('img');
    img.src = DELETE_IMAGE_SOURCE;
    return img;
}

function createInputBoxElement() {
    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute('contenteditable', 'true');
    return inputBox;
}

function handleOnClickNotesContainer(event) {
    const tagName = event.target.tagName;

    if (tagName === "IMG") {
        removeInputBoxElement(event.target);
    } else if (tagName === "P") {
        overrideOnKeyUpInputBoxElement();
    }
}

function removeInputBoxElement(target) {
    target.parentElement.remove();
}

function overrideOnKeyUpInputBoxElement() {
    let notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
        nt.onkeyup = function () {
            updateNotes();
        }
    });
}

document.addEventListener("keydown", event => {
    if(event.key ==="Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

function updateNotes() {
    localStorage.setItem(LOCAL_STORAGE_NOTES_KEY, NOTES_CONTAINER.innerHTML);
}

function getNotes() {
    return localStorage.getItem(LOCAL_STORAGE_NOTES_KEY);
}

function showNotes() {
    NOTES_CONTAINER.innerHTML = getNotes();
}

CREATE_BUTTON.addEventListener('click', handleCreateNote);
NOTES_CONTAINER.addEventListener("click", handleOnClickNotesContainer);

showNotes();