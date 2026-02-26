export function renderProject(project) {
    const projectDiv = document.createElement("div");
    projectDiv.setAttribute("class", "project-container");

    projectDiv.textContent = `${project.name}, ${project.description}`;

    const projectContainer = document.querySelector(".project-container");
    projectContainer.appendChild(projectDiv);
}

export function renderToDoItem(item) {
    const toDoDiv = document.createElement("div");
    toDoDiv.textContent = `- ${item.name}, due ${item.dueDate}`;
    toDoDiv.classList.add("to-do-item");

    const toDoContent = document.createElement("ul");
    toDoContent.classList.add("to-do-content", "collapsed");

    for (const prop in item) {
        if (prop === "name" || prop === "dueDate") continue;
        const toDoContentLine = document.createElement("li");
        toDoContentLine.textContent = item[prop];
        toDoContent.appendChild(toDoContentLine);
    }

    const projectContainer = document.querySelector(".project-container");

    projectContainer.appendChild(toDoDiv);
    toDoDiv.append(toDoContent);
}

export function expandToDoItem() {
    const toDoItem = document.querySelectorAll(".to-do-item");
    toDoItem.forEach((item) => item.addEventListener("click", function (event) {
        const toDoItemContent = event.currentTarget.querySelector(".to-do-content");
        toDoItemContent.classList.toggle("collapsed");
    }));

};

export function completeToDoItem(item) {
    // TO DO
}

export function deleteToDoItem(item) {
    // TO DO
}

export function addToDoItem(project) {
    /* TO DO
    Apre modal con form
    alla chiusura la modal chiama createToDoItem(item, project) passando il project scelto
    per ora passiamo default project, poi capiremo come separare
    per ora dovrò sempre chiamare renderToDoItem dopo averlo creato

    Ho dubbi su come spacchettare
    */

    const addBtn = document.querySelector(".add-to-do");
    const formModal = document.querySelector(".form-modal");
    addBtn.addEventListener("click", () => {
        formModal.style.display = "block";
        });
}