var tasksInProgressEl = document.querySelector("#tasks-in-progress");

var tasksCompletedEl = document.querySelector("#tasks-completed");

var pageContentEl = document.querySelector("#page-content");

var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");

var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskStatusChangeHandler = function(event) {
event.target.getAttribute("data-task-id");

 // get the task item's id
 var taskId = event.target.getAttribute("data-task-id");

 // get the currently selected option's value and convert to lowercase
 var statusValue = event.target.value.toLowerCase();

 // find the parent task item element based on the id
 var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

 if (statusValue === "to do") {
  tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
  tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
  tasksCompletedEl.appendChild(taskSelected);
  }
};

var taskFormHandler = function(event) {
  
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    var isEdit = formEl.hasAttribute("data-task-id");
    var completeEditTask = function(taskName, taskType, taskId) {
// find the matching task list item
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// set new values
taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;
formEl.removeAttribute("data-task-id");
document.querySelector("#save-task").textContent = "Add Task";
alert("Task Updated!");
      };
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
    var isEdit = formEl.hasAttribute("data-task-id");
    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    else {
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
      };

    
      createTaskEl(taskDataObj);
    }

    // check if input values are empty strings

  };
  var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("draggable", "true");
    listItemEl.setAttribute("data-task-id", taskIdCounter)

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);
    taskIdCounter++;
  };

  var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
// create edit button
var editButtonEl = document.createElement("button");
editButtonEl.textContent = "Edit";
editButtonEl.className = "btn edit-btn";
editButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(editButtonEl);

// create delete button
var deleteButtonEl = document.createElement("button");
deleteButtonEl.textContent = "Delete";
deleteButtonEl.className = "btn delete-btn";
deleteButtonEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(deleteButtonEl);

var statusSelectEl = document.createElement("select");
statusSelectEl.className = "select-status";
statusSelectEl.setAttribute("name", "status-change");
statusSelectEl.setAttribute("data-task-id", taskId);

actionContainerEl.appendChild(statusSelectEl);

var statusChoices = ["To Do", "In Progress", "Completed"];
for (var i = 0; i < statusChoices.length; i++) {
  // create option element
  var statusOptionEl = document.createElement("option");
  statusOptionEl.textContent = statusChoices[i];
  statusOptionEl.setAttribute("value", statusChoices[i]);

  // append to select
  statusSelectEl.appendChild(statusOptionEl);
}

return actionContainerEl;
  };

  formEl.addEventListener("submit", taskFormHandler);
  var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } 
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
  };

  var deleteTask = function(taskId) {
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
  };

  var editTask = function(taskId) {
  // get task list item element
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// get content from task name and type
var taskName = taskSelected.querySelector("h3.task-name").textContent;
console.log(taskName);

var taskType = taskSelected.querySelector("span.task-type").textContent;
console.log(taskType);

document.querySelector("input[name='task-name']").value = taskName;
document.querySelector("select[name='task-type']").value = taskType;
document.querySelector("#save-task").textContent = "Save Task";
formEl.setAttribute("data-task-id", taskId); 
};

var dragTaskHandler = function(event) {
  var taskId = event.target.getAttribute("data-task-id");
  event.dataTransfer.setData("text/plain", taskId);
  var getId = event.dataTransfer.getData("text/plain");
  console.log("getId:", getId, typeof getId);
} 

var dropZoneDragHandler = function(event) {
  var taskListEl = event.target.closest(".task-list");
  if (taskListEl) {
    event.preventDefault();
  }
  taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
};

var dropTaskHandler = function(event) {
  var id = event.dataTransfer.getData("text/plain");
  var draggableElement = document.querySelector("[data-task-id='" + id + "']");
  var dropZoneEl = event.target.closest(".task-list");
  var statusType = dropZoneEl.id;
  // set status of task based on dropZone id
  var statusSelectEl = draggableElement.querySelector("select[name='status-change']");
  if (statusType === "tasks-to-do") {
    statusSelectEl.selectedIndex = 0;
  } 
  else if (statusType === "tasks-in-progress") {
    statusSelectEl.selectedIndex = 1;
  } 
  else if (statusType === "tasks-completed") {
    statusSelectEl.selectedIndex = 2;
  }
  dropZoneEl.appendChild(draggableElement);
  dropZoneEl.removeAttribute("style");
};

var dragLeaveHandler = function(event) {
  console.dir(event.target);
  var taskListEl = event.target.closest(".task-list");
if (taskListEl) {
  taskListEl.removeAttribute("style");
}
}

pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveHandler);