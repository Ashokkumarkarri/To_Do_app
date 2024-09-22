let todoItemContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton")

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage()

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList))
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle('checked');

    let todoObjectIndex = todoList.findIndex(function(eachItem) {
        let eachTodoId = "todo" + eachTodoId.uniqueId;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false
        }

    })
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }


}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemContainer.removeChild(todoElement);

    let deleteIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true
        } else {
            return false
        }
    })
    todoList.splice(deleteIndex, 1)


}


function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement('li');
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemContainer.appendChild(todoElement);


    let inputElement = document.createElement('input');
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);


    let labelElement = document.createElement('label');
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add('checkbox-label');
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId)
    };

}

function onAddTodo() {
    let todosCount = todoList.length;
    todosCount = todosCount + 1;
    let userinputElement = document.getElementById('todoUserInput');
    let userInputValue = userinputElement.value;

    if (userInputValue === "") {
        alert("Enter valid input ");
        return
    }

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false

    }
    todoList.push(newTodo)
    createAndAppendTodo(newTodo);
    userinputElement.value = "";
}

for (let eachTodo of todoList) {
    createAndAppendTodo(eachTodo);
}
addTodoButton.onclick = function() {
    onAddTodo()
}


//added clear button 
let clearTodoButton = document.getElementById("clearTodoButton");

clearTodoButton.onclick = function() {
    // Clear the todo list from the DOM
    todoItemContainer.innerHTML = "";
    
    // Clear the todo list from the array and localStorage
    todoList = [];
    localStorage.setItem("todoList", JSON.stringify(todoList));
};
