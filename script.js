const domElements = {
    inputArea: document.getElementsByClassName("inputArea")[0],
    addButton: document.querySelector(".add"),
    listMenu: document.getElementsByClassName("listMenu")[0],
    removeAll: document.getElementById("deleteAllChecked"),
    progressBar: document.getElementById("myBar"),
    isDone: document.getElementById("isDone"),
    isAmount: document.getElementById("is"),

};


const toDoList = [];
let id = 1;
let idCount = 0

const pageActions = {
    toDoControlChek: function (checkBox, textField, container, id) {
        checkBox.addEventListener("change", function (e) {
            if (e.target.checked) {
                textField.style.textDecoration = "line-through";
                pageActions.deleteAllContainer(e, container);
                pageActions.progressBarFunc(e, id);

            } else {
                textField.style.textDecoration = "none";
                idCount = idCount - 1
                pageActions.progressBarFunc(e,id)
            }

        })
    },

    progressBarFunc: function (e, id) {
        toDoList.forEach((el) => {
            if (e.target.checked === true && el.id === +id){
                idCount += 1
            } else {
                idCount -=1
            }
        })
        console.log(idCount);
    },
    editBooleanButton: function (event) {
        if (event.target.innerText === "Edit") {
            event.target.innerText = "Ok";
            return true;
        } else {
            event.target.innerText = "Edit";
            return false;
        }
    },
    editTxt: function (btn, text, editedText, id) {
        btn.addEventListener("click", function (e) {
            console.log(id);
            if (pageActions.editBooleanButton(e) === true) {
                text.style.display = "none";
                editedText.style.display = "block";
                editedText.value = text.innerText;
            } else {
                text.style.display = "block";
                editedText.style.display = "none";
                text.innerText = editedText.value;
                pageActions.changeToDoObjText(text,id)
            }
        })

    },
    changeToDoObjText: function (text, id) {
        toDoList.forEach((el) => {
            if (el.id === +id){
                el.text = text.innerText
            }
        })
    },

    deleteContainer: function (deleteButton, container) {
        deleteButton.addEventListener("click", function (){
            container.remove();
        })
    },
    deleteAllContainer: function (e, container) {
        domElements.removeAll.addEventListener("click", function () {
            if (e.target.checked === true){
                container.remove()
            }
        })
    },



}



domElements.addButton.addEventListener("click", function (){
    if (domElements.inputArea.value !== ""){
        const toDoObj = {id: id++};
        toDoObj.text = domElements.inputArea.value;

        domElements.inputArea.value = "";

        create(toDoObj);
    }
});

function create(toDoObj) {
   domElements.listMenu.append(createTodoItem(toDoObj.text, toDoObj.id));

   toDoList.push(toDoObj);
}


function createTodoItem(text, id){
    const container = document.createElement('div');
    const leftList = document.createElement("div");
    const checkBox = document.createElement('input');
    const textField = document.createElement('span');
    const editableText = document.createElement('input');
    const inputSpanDiv = document.createElement('div');
    const rightList = document.createElement("div");
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    container.classList.add("listBox");
    container.id = id;
    leftList.classList.add("leftList");
    inputSpanDiv.classList.add("inputSpanDiv");
    rightList.classList.add("rightList");

    checkBox.classList.add("checkBoxList");
    checkBox.type = "checkbox";

    textField.classList.add("inputedText");
    textField.innerText = text;

    editableText.classList.add(".editSpan");
    editableText.type = "text";
    editableText.style.display = "none";

    editButton.classList.add("edit");
    editButton.innerText = "Edit";

    deleteButton.classList.add("delete");
    deleteButton.innerText = "X";

    inputSpanDiv.append(editableText, textField);
    leftList.append(checkBox, inputSpanDiv);
    rightList.append(editButton, deleteButton);
    container.append(leftList, rightList);

    pageActions.toDoControlChek(checkBox,textField, container,container.id);
    pageActions.editTxt(editButton, textField, editableText, container.id);
    pageActions.deleteContainer(deleteButton, container);

    return container
}




