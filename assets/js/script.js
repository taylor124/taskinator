var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
  
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  if (!taskNameInput || !taskTypeInput) {
  alert("You need to fill out the task form!");
  return false;
}

if (true) {
  // this will run because true is true
    console.log("Is true true? Yes.");
  }
  
  if (false) {
  // this will not run because false is not true
    console.log("Is false true? No.");
  }
  
  if (3 === 10 || "a" === "a") {
  // this will run because at least one of the conditions is true
    console.log("Does 3 equal 10? No.");
    console.log("Does the letter 'a' equal the letter 'a'? Yes.");
  }
  
  if (3 === 10 && "a" === "a") {
  // this will not run because both conditions have to be true to run
    console.log("Does 3 equal 10? No.");
    console.log("Does the letter 'a' equal the letter 'a'? Yes.");
  }
  formEl.reset();
  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
  // check if input values are empty strings

  };

  var createTaskEl = function(taskDataObj) {
// create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// create div to hold task info and add to list item
var taskInfoEl = document.createElement("div");
taskInfoEl.className = "task-info";
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

listItemEl.appendChild(taskInfoEl);

// add entire list item to list
tasksToDoEl.appendChild(listItemEl);
  };

  formEl.addEventListener("submit", taskFormHandler);
