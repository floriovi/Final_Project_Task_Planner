// Define User Interface Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const name = document.querySelector("#name");
const description = document.querySelector("#description");
const assignedTo = document.querySelector("#assignedTo");
const dueDate = document.querySelector("#dueDate");
const status = document.querySelector("#status");
const errorElement = document.getElementById("error");


form.addEventListener("submit", function(e){
    let messages = []
     // When form submit is clicked, performs function.

    // Name validation
    if (name.value === "" || name.value == null) {
        messages.push("Name is required")
    }

    if (name.value.length < 8) {
        messages.push("Please enter a name longer than 8 characters!")
    }

    // Description validation
    if (description.value === "" || description.value == null) {
        messages.push("Description is required")
    }

    if (description.value.length < 20) {
        messages.push("Please enter a description longer than 20 characters!")
    }

    // Assigned To validation

    if (assignedTo.value === "" || assignedTo.value == null) {
        messages.push("Assigned to is required")
    }

    if (assignedTo.value.length < 8) {
        messages.push("Please enter an assigned to value longer than 8 characters!")
    }

    
    if (messages.length > 0){
        e.preventDefault(); // Prevent default form behaviours.
        errorElement.innerText = messages.join(", ")
    } 
});




