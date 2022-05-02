class Task {
    constructor(taskId, taskName, taskPriority) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskPriority = taskPriority;
    }
}
//This function is used in insertNewtask.html to save the inserted records . 
function saveTask() {
    let enteredname = document.getElementById("taskName").value;
    if (enteredname == "" || parseInt(enteredname) >= 0) {
        alert("Invalid Name");
    } else {
        let taskRecord = new Task(document.getElementById("taskId").value, document.getElementById("taskName").value, document.getElementById("taskPriority").value);
        let taskRecords = [];
        if (localStorage.getItem("myTaskRecords")) {
            taskRecords = JSON.parse(localStorage.getItem("myTaskRecords"));
        } else {
            taskRecords = [];
        }
        taskRecords.push(taskRecord);
        localStorage.setItem("myTaskRecords", JSON.stringify(taskRecords));
        window.location.replace("./Dashboard.html");
    }
}
//This function is used to get the task records from local storage and display those records in Dashboard.html page
function getTheTaskRecordsFromLocalStorage() {
    let taskTableData = "";
    let taskRecords = [];
    if (localStorage.getItem("myTaskRecords")) {
        taskRecords = JSON.parse(localStorage.getItem("myTaskRecords"));
    } else {
        taskRecords = [];
    }
    let perticularTaskSequence = 0;
    for (let i = 0; i < taskRecords.length; i++) {
        taskTableData += "<tr><td>" + taskRecords[i].taskId + "</td><td>" + taskRecords[i].taskName + "</td><td>" + taskRecords[i].taskPriority + "</td>"
            + "<td><button type='button' onclick='deleteTask(" + perticularTaskSequence + ")'>Delete</button></td>"
            + "<td><button type='button' onclick='modifyWindowDisplay(" + perticularTaskSequence + ")'>Modify</button></td></tr>";
        perticularTaskSequence++;
    }
    document.getElementById("tableData").innerHTML = taskTableData;
    document.getElementById("modifyWindow").style.visibility = "hidden";
}
//this function is used in Dashboard.html page to delete selected item.
function deleteTask(perticularTaskSequence) {
    console.log(perticularTaskSequence);
    let taskRecords = JSON.parse(localStorage.getItem("myTaskRecords"));
    taskRecords.splice(perticularTaskSequence, 1);
    localStorage.setItem("myTaskRecords", JSON.stringify(taskRecords));
    getTheTaskRecordsFromLocalStorage();
}
//this function is used in insertNewTask html page to auto increase the taskId
function loadTheStudentId() {
    let systemGeneratedTaskId = 0;
    if (localStorage.getItem("myTaskRecords")) {
        let taskRecords = JSON.parse(localStorage.getItem("myTaskRecords"));
        if (taskRecords.length != 0) {
            systemGeneratedTaskId = parseInt(taskRecords[taskRecords.length - 1].taskId);
            systemGeneratedTaskId += 1;
        } else {
            systemGeneratedTaskId += 1;
        }
    } else {
        systemGeneratedTaskId = 1;
    }
    document.getElementById("taskId").value = systemGeneratedTaskId;
}
//This function in called by modify button present in Dashboard.html page
function modifyWindowDisplay(perticularTaskSequence) {
    document.getElementById("modifyWindow").style.visibility = "visible";
    let modifyTableData = "";
    let taskRecords = JSON.parse(localStorage.getItem("myTaskRecords"));

    modifyTableData += "<tr><td>" + taskRecords[perticularTaskSequence].taskId
        + "</td><td >" + "<input type='text' id='modifyTaskName' value = '" + taskRecords[perticularTaskSequence].taskName + "'>"
        + "</td><td >" + " <select id='modifyTaskPriority'><option value='Low'>Low</option><option value='Medium'>Medium</option><option value='High'>High</option></select>"
        + "<td><button type='button' onclick='modifyTask(" + perticularTaskSequence + ")'>Update</button></td></tr>";
    document.getElementById("modifyTableData").innerHTML = modifyTableData;
}
//this function collects data from modify table window and alse updated it in sotorage.
function modifyTask(perticularTaskSequence) {
    let enteredname = document.getElementById("modifyTaskName").value;
    if (enteredname == "" || parseInt(enteredname) >= 0) {
        alert("Invalid Name");
    } else {
        let taskRecords = JSON.parse(localStorage.getItem("myTaskRecords"));
        taskRecords[perticularTaskSequence].taskName = document.getElementById("modifyTaskName").value;
        taskRecords[perticularTaskSequence].taskPriority = document.getElementById("modifyTaskPriority").value;
        localStorage.setItem("myTaskRecords", JSON.stringify(taskRecords));
        getTheTaskRecordsFromLocalStorage();
        document.getElementById("modifyTableData").innerHTML = "";
    }

}
