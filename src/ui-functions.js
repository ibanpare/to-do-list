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
    toDoDiv.setAttribute("class", "to-do-item collapsed");

    const projectContainer = document.querySelector(".project-container");

    projectContainer.appendChild(toDoDiv);
}

export function expandToDoItem(item) {
    // TO DO
    // Da capire se ne serve una per richiuderlo o è la stessa
    
}

export function completeToDoItem(item) {
    // TO DO
}

export function deleteToDoItem(item) {
    // TO DO
}

export function addToDoItem(item, project) {
    // TO DO
}