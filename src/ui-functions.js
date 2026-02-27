import toDo, { markAsDone, updateField, displayToDo } from "./to-do-item.js";
import project, { addToProject } from "./projects.js";

export function renderToDoItem(item) {
    const toDoDiv = document.createElement("div");
    toDoDiv.textContent = `- ${item.name}, due ${item.dueDate}`;
    toDoDiv.classList.add("to-do-item");

    const toDoContent = document.createElement("ul");
    toDoContent.classList.add("to-do-content", "collapsed");

    for (const prop in item) {
        if (prop === "name" || prop === "dueDate") continue;
        const toDoContentLine = document.createElement("li");
        toDoContentLine.textContent = `${prop}: ${item[prop]}`;
        toDoContent.appendChild(toDoContentLine);
    }

    const projectContainer = document.querySelector(".project-container");

    projectContainer.appendChild(toDoDiv);
    toDoDiv.append(toDoContent);
}

export function renderProject(project) {
    const projectDiv = document.createElement("div");
    projectDiv.setAttribute("class", "project-container");

    projectDiv.textContent = `${project.name}, ${project.description}`;

    const mainContainer = document.querySelector(".main-container");
    mainContainer.appendChild(projectDiv);

    for (const item in project.items) {
        renderToDoItem(project.items[item]);
    }

    expandToDoItem();

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

    Ho dubbi su come spacchettare, sicuramnete c'è troppa roba, intanto faccio questo monster e poi vediamo
    */

    const addBtn = document.querySelector(".add-to-do");
    const formModal = document.querySelector(".form-modal");
    const closeBtn = document.querySelector(".close");
    addBtn.addEventListener("click", () => {
        formModal.style.display = "block";
    });
    closeBtn.addEventListener("click", () => {
        formModal.style.display = "none";
    });

    const submitBtn = document.querySelector("button[type='submit']");
    submitBtn.addEventListener("click", () => {
        console.log("submitted");

        const toDoName = document.querySelector("input#to-do-name").value;
        const toDoDescription = document.querySelector("input#to-do-description").value;
        const toDoPriority = document.querySelector("select#to-do-priority").value;
        const toDoDueDate = document.querySelector("input#to-do-dueDate").value;
        const toDoNotes = document.querySelector("textarea#to-do-notes").value;

        addToProject(project, toDo({ name: toDoName, description: toDoDescription, priority: toDoPriority, dueDate: toDoDueDate, notes: toDoNotes }, project));

        //dovrebbe anche chiudere modal qui

    })
}

export function renderAllProjects(defaultProject) {

    const seeAllBtn = document.querySelector(".see-all-btn");
    seeAllBtn.addEventListener("click", () => {
        //clean up screen

        const mainContainer = document.querySelector(".main-container");
        const mainContainerChildren = Array.from(mainContainer.children)
        for (const child of mainContainerChildren) {
            mainContainer.removeChild(child);
        }
        // qui dovrebbe prendere da local storage, per ora prende solo dfeault proj
        renderProject(defaultProject);
    })
}