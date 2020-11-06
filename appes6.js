class Task {
  constructor(name, description, assignedTo, dueDate, status, array) {
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.status = status;
    this.id = `${array.length < 1 ? 1 : array.length + 1}`;
  }
}

document.addEventListener("click", function (event) {
  const isButton = event.target.nodeName == "BUTTON";
  if (isButton) {
    const element = event.target;
    let buttonJob = element.attributes.job.value;
    if (buttonJob == "update") {
      UI.updateTask(element);
    } else if (buttonJob == "delete") {
      UI.deleteTask(element);
    }
  }
});

class UI {
  addTaskToList(task) {
    const taskCollection = document.getElementById("card-container");

    // Insert the custom list
    let cardHTML = `
    <div class="col-lg-2" id="detailed-task" taskId="${task.id}">
            <div class="card" style="width: 18rem">
              <div class="card-header">${task.name}</div>
              <ul class="list-group list-group-flush">
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
                <button type="button" class="btn btn-primary" job="delete" deleteID="${task.id}">Delete</button>
                <a href="#task-form"><button type="button" job="update" class="btn btn-primary" job="update" deleteID="${task.id}">Update</button></a>
              </ul>
            </div>
          </div>
  `;

    taskCollection.innerHTML += cardHTML;

    const taskList = document.getElementById("collection");

    let listHTML = ` <a href="#" class="list-group-item list-group-item-action flex-column align-items-start" taskId="${task.id}">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Assigned To: ${task.assignedTo} </h5>
            <small>Due Date: ${task.dueDate} </small>
          </div>
          <small>Status: ${task.status}</small>
        </a>`;
    taskList.innerHTML += listHTML;
  }

  showAlert(message, className) {
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
  }

  static deleteTask(element) {
    //this removes the item from the array

    let thisTaskID =
      element.parentNode.parentNode.parentNode.attributes.taskId.value;
    for (let i = 0; i < taskCollection.length; i++) {
      if ((taskCollection[i].id = thisTaskID)) {
        taskCollection.splice(i, 1);
        localStorage.setItem("taskArray", JSON.stringify(taskCollection));
      }
    }
    //removes card
    element.parentNode.parentNode.parentNode.parentNode.removeChild(
      element.parentNode.parentNode.parentNode
    );

    //removes task from list
    let listAnchor = document.querySelectorAll("a");
    for (let i = 0; i < listAnchor.length; i++) {
      element = listAnchor[i];
      if (element.attributes.taskId.value == thisTaskID) {
        element.parentNode.removeChild(element);
      }
    }
  }

  // Update Task
  static updateTask(element) {
    let currentTask = {};
    let currentTaskID =
      element.parentNode.parentNode.parentNode.parentNode.attributes.taskId
        .value;

    for (let i = 0; i < taskCollection.length; i++) {
      if (taskCollection[i].id == currentTaskID) {
        currentTask = taskCollection[i];
      }
    }
    document.querySelector("#name").value = currentTask.name;
    document.querySelector("#assignedTo").value = currentTask.assignedTo;
    document.querySelector("#description").value = currentTask.description;

    document.querySelector(
      "#addButton"
    ).outerHTML = `<button type="button" id="saveUpdate" class="btn btn-primary" job="saveUpdate">Save</button>`;

    document
      .querySelector("#saveUpdate")
      .addEventListener("click", function () {
        const taskName = document.querySelector("#name").value;
        const taskDescription = document.querySelector("#description").value;
        const taskAssignedTo = document.querySelector("#assignedTo").value;
        const taskDueDate = document.querySelector("#dueDate").value;
        const taskStatus = document.getElementById("status").value;
        if (
          taskName === "" ||
          taskDescription === "" ||
          taskAssignedTo === "" ||
          taskAssignedTo.length < 3 ||
          taskDescription.length < 10 ||
          taskName.length < 3
        ) {
          // Error alert
          ui.showAlert(
            "Please fill in all fields, name and assigned to need to be longer than 8 characters and description longer than 20",
            "error"
          );
        } else {
          currentTask.name = taskName;
          currentTask.description = taskDescription;
          currentTask.assignedTo = taskAssignedTo;
          currentTask.dueDate = taskDueDate;
          currentTask.status = taskStatus;
          localStorage.setItem("taskArray", JSON.stringify(taskCollection));

          location.reload();
          console.log(taskCollection);
        }
      });
  }

  clearFields() {
    // Reset Form Fields
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("assignedTo").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("status").value = "TODO";
  }
}

//  Event Listeners for adding task
document.querySelector("#task-form").addEventListener("submit", function (e) {
  // Get Form values
  const taskName = document.querySelector("#name").value;
  const taskDescription = document.querySelector("#description").value;
  const taskAssignedTo = document.querySelector("#assignedTo").value;
  const taskDueDate = document.querySelector("#dueDate").value;
  const taskStatus = document.getElementById("status").value;

  // Instantiate a Book
  const task = new Task(
    taskName,
    taskDescription,
    taskAssignedTo,
    taskDueDate,
    taskStatus,
    taskCollection
  );

  taskCollection.push(task);
  localStorage.setItem("taskArray", JSON.stringify(taskCollection));

  // Validate
  if (
    taskName === "" ||
    taskDescription === "" ||
    taskAssignedTo === "" ||
    taskAssignedTo.length < 3 ||
    taskDescription.length < 10 ||
    taskName.length < 3
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
    ui.showAlert("Task Added!", "success");
  }

  // Clear fields
  ui.clearFields();

  e.preventDefault();
});

// Array
// Instantiate the UI Object
const ui = new UI();
let dataReturned = localStorage.getItem("taskArray"); // Retrieves local storage item from key
let taskCollection = []; // initiates array
if (dataReturned) {
  taskCollection = JSON.parse(dataReturned); // If data is present in local storage, parse it back into an object
  populatePage(taskCollection);
} else {
  taskCollection = [];
}

function populatePage(array) {
  for (let i = 0; i < array.length; i++) {
    ui.addTaskToList(array[i]);
  }
}
