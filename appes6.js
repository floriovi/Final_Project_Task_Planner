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

class UI {
  addTaskToList(task) {
    const taskCollection = document.getElementById("card-container");

    // Insert the custom list
    taskCollection.insertAdjacentHTML(
      "beforeend",
      `
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
                <span><i class="fas fa-times fa-lg"></i></span>
              </ul>
            </div>
          </div>;
  `
    );

    const taskList = document.getElementById("collection");

    taskList.insertAdjacentHTML(
      "beforeend",
      ` <div class="list-group collection" taskId="${task.id}">
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

  //   deleteBook(target) {
  //     if (target.className === "delete") {
  //       target.parentElement.parentElement.remove();
  //     }
  //   }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.parentElement.remove();
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

  // Clear fields
  ui.clearFields();

  e.preventDefault();
});

// Event: Remove a Book
document.querySelector("#collection").addEventListener("click", function (e) {
  UI.deleteBook(e.target);
});
