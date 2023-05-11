const notesContainer = document.getElementById("app");
const addNotesButton = notesContainer.querySelector(".add-note");


getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNotesButton);
});

addNotesButton.addEventListener("click", () => addNote());

function getNotes(){
    return JSON.parse(localStorage.getItem("localStickyNotes")) || [];
}

function saveNotes(notes){
    localStorage.setItem("localStickyNotes", JSON.stringify(notes))
}

function createNoteElement(id, content){
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () => {
        // deleteNote(id, element);
        const doDelete = confirm(
            "Are you sure you wish to delete this sticky note?"
          );
      
          if (doDelete) {
            deleteNote(id, element);
          }
    })

    return element;
}

function addNote(){
    const existingNotes = getNotes()
    const noteObject = {
        id : Math.floor(Math.random() * 100000),
        content : ""
    }

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNotesButton);

    existingNotes.push(noteObject);
    saveNotes(existingNotes);
}

function updateNote(id, newContent){
    const existingNotes = getNotes();
    const targetNote = existingNotes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(existingNotes);
}

function deleteNote(id, element){
    const existingNotes = getNotes().filter(note => note.id != id);

    saveNotes(existingNotes);

    notesContainer.removeChild(element)
}