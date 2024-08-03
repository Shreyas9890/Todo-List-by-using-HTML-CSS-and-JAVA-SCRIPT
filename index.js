let rootContainerEl = document.getElementById("rootContainer");
let inputFildEl = document.getElementById("inputFild");
// let todoList = [

//     {
//         title: "HTML",
//         id: 1
//     },
//     {
//         title: "CSS",
//         id: 2
//     },
//     {
//         title: "JAVA",
//         id: 3
//     }, 
     
// ]

function getTodoList(){
    let myTodoList = localStorage.getItem("myTodo");
    if (myTodoList  === null){
        return [];
    }
    else{
        return JSON.parse(myTodoList);
    }
}

let todoList =getTodoList();

function OnSaveTodo(){
    let strTodo = JSON.stringify(todoList);
    localStorage.setItem("myTodo", strTodo)
}

function onTodoStatusChange(checkboxId, titleId, todoId){
    
    let myCheckboxEl = document.getElementById(checkboxId);
    let myTitleEl = document.getElementById(titleId);
    
    console.log(myTitleEl);

    if (myCheckboxEl.checked === true){
        myTitleEl.classList.add("checked")
    }
    else{
        myTitleEl.classList.remove("checked")
    }
    
let todoIndex =  todoList.findIndex(function(each){
        let myTodoId = "todo" + each.id;
          if(myTodoId === todoId){
              return true;
          }
          else{
              return false;
          }

    })
    console.log(todoIndex);
    let selectedTodo = todoList[todoIndex];

    if(selectedTodo.isChecked === true)
    {
        todoList[todoIndex].isChecked = false;
    }

    else{
        todoList[todoIndex].isChecked = true;
    }
}


function onTodoDelete(todoId){
    let myListCont = document.getElementById( todoId);
    myListCont.remove(todoId);
    // Remove the Todo item from the local storage
    let todoIndex = todoList.findIndex(function (each) {
        let myTodoId = "todo" + each.id;
        if (myTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });


    if (todoIndex !== -1) {
        todoList.splice(todoIndex, 1);
        OnSaveTodo(); // Update the local storage
    }

    console.log(todoIndex);
}


 function onAppendTodo(todo){
    let checkboxId = "checkbox" + todo.id;
    let titleId = "title" + todo.id;
    let todoId = "todo" + todo.id;

     let todoListContEl = document.createElement("li");
     todoListContEl.classList.add("todo-list-cont");
     todoListContEl.id = todoId;
     rootContainerEl.appendChild(todoListContEl);
     

     let checkboxEl = document.createElement("input");
     checkboxEl.type ="checkbox";
     checkboxEl.id = checkboxId;
     if(todo.isChecked === true){
        checkboxEl.checked = true;
     }
     checkboxEl.onclick = function (){
         onTodoStatusChange(checkboxId, titleId, todoId);

     }
     todoListContEl.appendChild(checkboxEl, titleId);

     let labelEl =document.createElement("label");
     labelEl.classList.add("label-cont");
     labelEl.htmlFor =checkboxId;
     todoListContEl.appendChild(labelEl); 

     let titleEl = document.createElement("h5");
     titleEl.textContent =todo.title;
     titleEl.id = titleId;
     if(todo.isChecked === true){
        titleEl.classList.add("checked")
     }
     labelEl.appendChild(titleEl);

     let btnEl = document.createElement("button");
     btnEl.classList.add("btn-delete")
     btnEl.onclick = function () {
         onTodoDelete(todoId);

     }
     labelEl.appendChild(btnEl);

    //  <i class="fa-solid fa-trash"></i>
    
    let iconBtnEl = document.createElement("i");
     iconBtnEl.classList.add("fa-solid" ,"fa-trash");
     btnEl.appendChild(iconBtnEl);
 }
 
function onAddtodo(){
    let myTodo = inputFildEl.value;
    let myDate = new Date();
    let myId = myDate.getTime();
    
    let newTodoList = 
        {
        title: myTodo ,
        id: myId,    
        isChecked : false
        }

    onAppendTodo(newTodoList);

    todoList.push(newTodoList);

    inputTodoEl.value = "";
}




 for(let todo of todoList){
    onAppendTodo(todo);
 }