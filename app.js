// Array
let taskArray = [];

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
    UI.deleteTask(element);
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
                <button type="button" class="btn btn-primary" deleteID="${task.id}">Delete</button>
              </ul>
            </div>
          </div>;
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
    for (let i = 0; i < taskArray.length; i++) {
      if ((taskArray[i].id = thisTaskID)) {
        taskArray.splice(i, 1);
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
    taskArray
  );

  taskArray.push(task);

  // Instantiate the UI Object
  const ui = new UI();
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

// Event: Remove a Task
// document.querySelector("#collection").addEventListener("click", function (e) {
//   UI.deleteTask(e.target);
// });
// document.addEventListener("click", function (e) {
//   UI.deleteTask(e.target);
// });
