// // Define User Interface Variables // Efent Listeners
// const form = document.querySelector("#task-form"); // Targeting form
// const taskList = document.querySelector(".collection"); // Targeting list of all tasks
// const clearBtn = document.querySelector(".clear-tasks"); // Targets the clear button
// const filter = document.querySelector("#filter");
// const taskName = document.querySelector("#name"); // Targets the name input field
// const taskDescription = document.querySelector("#description"); // Targets the description input field
// const taskAssignedTo = document.querySelector("#assignedTo"); // Targets the assigned to input field
// const taskDueDate = document.querySelector("#dueDate"); // Targets the due date input field
// const taskStatus = document.querySelector("#status"); // Targets the status input field
// const errorElement = document.getElementById("error"); // Targets the error message form validation

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
  const taskCollection = document.getElementById("collection");
  // Create custom list-group item
  const divList = document.createElement("div");
  // Add bootstrap class to div
  divList.classList.add("list-group collection");
  // Insert the custom list
  divList.innerHTML = `
  <a href="#" class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1 task-name">${task.name}</h5>
                <small class="task-date">${task.dueDate}</small>
              </div>
              <p class="mb-1 task-description">${task.description}</p>
              <small class="task-status">${task.status}</small>
              <p>
                <small class="task-assigned-to">${task.assignedTo}</small>
              </p>
              <span><i class="fas fa-times fa-lg"></i></span>
            </a>
  `;

  taskCollection.appendChild(divList);
};

//  Event Listeners
document.querySelector("#task-form").addEventListener("submit", function (e) {
  // Get Form values
  const taskName = document.querySelector("#name").value;
  const taskDescription = document.querySelector("#description").value;
  const taskAssignedTo = document.querySelector("#assignedTo").value;
  const taskDueDate = document.querySelector("#dueDate").value;
  const taskStatus = document.querySelector("#status").value;

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

  // Add task to list
  ui.addTaskToList(task);

  e.preventDefault();
});

// form.addEventListener("submit", function (e) {
//   let messages = [];
//   // When form submit is clicked, performs function.

//   // Name validation
//   if (name.value === "" || name.value == null) {
//     messages.push("Name is required");
//   }

//   if (name.value.length < 8) {
//     messages.push("Please enter a name longer than 8 characters!");
//   }

//   // Description validation
//   if (description.value === "" || description.value == null) {
//     messages.push("Description is required");
//   }

//   if (description.value.length < 20) {
//     messages.push("Please enter a description longer than 20 characters!");
//   }

//   // Assigned To validation

//   if (assignedTo.value === "" || assignedTo.value == null) {
//     messages.push("Assigned to is required");
//   }

//   if (assignedTo.value.length < 8) {
//     messages.push(
//       "Please enter an assigned to value longer than 8 characters!"
//     );
//   }

//   if (messages.length > 0) {
//     e.preventDefault(); // Prevent default form behaviours.
//     errorElement.innerText = messages.join(", ");
//   }
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
