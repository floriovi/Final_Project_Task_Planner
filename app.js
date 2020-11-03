// // Define User Interface Variables // Event Listeners
const form = document.querySelector("#task-form"); // Targeting form
const taskList = document.querySelector(".collection"); // Targeting list of all tasks
const clearBtn = document.querySelector(".clear-tasks"); // Targets the clear button
const filter = document.querySelector("#filter");
const taskNameS = document.querySelector("#name"); // Targets the name input field
const taskDescriptionS = document.querySelector("#description"); // Targets the description input field
const taskAssignedToS = document.querySelector("#assignedTo"); // Targets the assigned to input field
const taskDueDateS = document.querySelector("#dueDate"); // Targets the due date input field
const taskStatusS = document.querySelector("#status"); // Targets the status input field
const errorElement = document.getElementById("error"); // Targets the error message form validation

// Book Constructor
let idCounter = (function () {
  let id = 1;

  return function taskPlanner(name, description, assignedTo, dueDate, status) {
    this.id = id++;
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.status = status;
  };
})();

// UI Constructor
function UI() {}

// Add task to list
UI.prototype.addTaskToList = function (task) {
  const taskCollection = document.getElementById("card-container");

  // Insert the custom list
  taskCollection.insertAdjacentHTML(
    "beforeend",
    `
  <div class="col-lg-2" id="detailed-task">
          <div class="card" style="width: 18rem">
            <div class="card-header">${task.name}</div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <b>Task ID:</b>
                <p>${task.id}</p>
              </li>
              <li class="list-group-item">
                <b>Assigned To:</b>
                <p>${task.assignedTo}</p>
              </li>
              <li class="list-group-item">
                <b>Due Date:</b>
                <p>${task.dueDate}</p>
              </li>
              <li class="list-group-item">
                <b>Status:</b>
                <p>${task.status}</p>
              </li>
              <li class="list-group-item">
                <b>Description:</b>
                <p>${task.description}</p>
              </li>
              <span><i class="fas fa-times fa-lg"></i></span>
            </ul>
          </div>
        </div>;
`
  );

  const taskList = document.getElementById("collection");

  taskList.insertAdjacentHTML(
    "beforeend",
    ` <div class="list-group collection">
                <span href="#" class="list-group-item list-group-item">
                  <div
                    class="d-flex w-100 justify-content-between align-items-center"
                  >
                    <span class="mb-1 task-name">Task for ${task.assignedTo}</span>
                    <span class="task-date">${task.dueDate}</span>
                    <span class="task-status">${task.status}</span>
                    <i class="fas fa-times fa-lg delete"></i>
                  </div>
                </span>
              </div>
              `
  );

  // Reset Form Fields
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("assignedTo").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("status").value = "TODO";
  console.log(task);
};

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector(".container");
  const formRow = document.querySelector(".formrow");
  container.insertBefore(div, formRow);

  // Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

// // Delete Task
// UI.prototype.deleteBook = function (target) {
//   if (target.className === "delete") {
//     target.parentElement.parentElement.parentElement.remove();
//   }
// };

//  Event Listeners for adding task
document.querySelector("#task-form").addEventListener("submit", function (e) {
  // Get Form values
  const taskName = document.querySelector("#name").value;
  const taskDescription = document.querySelector("#description").value;
  const taskAssignedTo = document.querySelector("#assignedTo").value;
  const taskDueDate = document.querySelector("#dueDate").value;
  const taskStatus = document.getElementById("status").value;

  // Instantiate a Book
  const task = new idCounter(
    taskName,
    taskDescription,
    taskAssignedTo,
    taskDueDate,
    taskStatus
  );

  // Instantiate the UI Object
  const ui = new UI();
  // Validate
  if (
    taskName === "" ||
    taskDescription === "" ||
    taskAssignedTo === "" ||
    taskAssignedTo.length < 8 ||
    taskDescription.length < 20 ||
    taskName.length < 8
  ) {
    // Error alert
    ui.showAlert(
      "Please fill in all fields, name and assigned to need to be longer than 8 characters and description longer than 20",
      "error"
    );
  } else {
    // Add task to list
    ui.addTaskToList(task);

    // Show success
    ui.showAlert("Book Added!", "success");
  }

  e.preventDefault();
});

// // Event Listener for delete
// document.getElementById("collection").addEventListener("click", function (e) {
//   // Instantiate the UI Object
//   const ui = new UI();

//   // Delete Task
//   ui.deleteBook(e.target);

//   // Show message
//   ui.showAlert("Task Removed!", "success");

//   e.preventDefault();
// });

// // Load all event listeners
// loadEventListeners();

// // Load all event listeners
// function loadEventListeners() {
//     // Add task event
//     form.addEventListener("submit", addTask);
// }

// // Add Task
// function addTask(e) {
//     if(name.value === "") {
//         alert("Add a task");
//     }

//     // Create list group item / task-name
//     const liItem = document.createElement("h5");
//     // Add class
//     liItem.className = "list-group-item list-group-item-action";
//     // Add dead link attribute
//     liItem.setAttribute("href", "#");

//     // Create div containing task name and task date.
//     const nameDateDiv = document.createElement("div");
//     // Add class
//     nameDateDiv.className = "d-flex w-100 justify-content-between";

//     // Create task-name h5
//     const headingFive = document.createElement("h5");
//     // Add class
//     headingFive.className = "mb-1 task-name";

//     // Create task-date small
//     const smallName = document.createElement("small");
//     // Add class
//     smallName.className = "task-date";

//     // Create description p
//     const descriptionP = document.createElement("p");
//     // Add class
//     descriptionP.className = "mb-1 task-description";

//     // Add task-status small
//     const smallStatus = document.createElement("small");
//     // Add class
//     smallStatus.className = "task-status"

//     // Create p which contains the assigned to small
//     const taskAssignedP = document.createElement("p");

//     // Create small to go into the p
//     const taskAssignedSmall = document.createElement("small");
//     // Add class
//     taskAssignedSmall.className = "task-assigned-to";

//     // e.preventDefault();
// }
