const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOLISTS_LS = 'toDoLists'

let toDoLists = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToLists = toDoLists.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDoLists = cleanToLists;
    saveToDoLists();
}

function saveToDoLists(){
    localStorage.setItem(TODOLISTS_LS, JSON.stringify(toDoLists));
}

function paintToDo(text){
    const toDo_li = document.createElement("li");
    const toDo_delBtn = document.createElement("button");
    const toDo_span = document.createElement("span");
    const newObjId = toDoLists.length + 1;
    toDo_delBtn.innerText = "X";
    toDo_delBtn.addEventListener("click",deleteToDo);
    toDo_span.innerText = text;
    toDo_li.appendChild(toDo_span);
    toDo_li.appendChild(toDo_delBtn);
    toDo_li.id = newObjId;
    toDoList.appendChild(toDo_li);
    const toDoObj = {
        text: text,
        id: newObjId
    };
    toDoLists.push(toDoObj);
    saveToDoLists();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDoLists(){
    const loadedToDoLists = localStorage.getItem(TODOLISTS_LS);
    if (loadedToDoLists !== null) {
        const parsedToDoLists = JSON.parse(loadedToDoLists)
        parsedToDoLists.forEach(function(toDo) {
            paintToDo(toDo.text)
        });
}
}

function init() {
    loadToDoLists();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();