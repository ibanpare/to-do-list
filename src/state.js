import { saveToLocalStorage } from "./storage.js";
import project from "./projects.js"

const defaultProject = project({name: "Default Project", description: "Default Project created at application start"});

let projects = {};

addToProjectsObject(defaultProject);

export function listProjects() {
    return projects;
    // list available projects, I assume from local storage
}


/*

qui mettiamo tutte le logiche di aggiornamento,
quando chiamare storage
funzioni tipo add to do ecc

l'array dei progetti, che non esporremo
esporremo solo list projects

*/

//    saveToLocalStorage(name, JSON.stringify{id, name, description, items});

//Project functions

export function addToProjectsObject(project) {
    projects[project.id] = project;
} 


export function addToProject(projectId, toDoItem) {
    projects[projectId].items[toDoItem.id] = toDoItem;
    //TO DO qui salviamo in local storage
} 

export function removeFromProject(project, toDoItem) {
    toDoItem.projectId = undefined;
    project.items.splice(project.items.indexOf(toDoItem), 1);
}

export function getFromProject(project, toDoItem) {
    console.log(project.items[project.items.indexOf(toDoItem)]);
}

export function displayProjectItems(project) {
    for(const item in project.items) {
        console.log(project.items[item]);
    }
}

//To Do Items functions

export function markAsDone(item) {
    item.status = "done";
}

export function updateField(item, field, newContent) {
    item[field] = newContent;
}

export function displayToDo(item) {
    for(const prop in item) {
        console.log(prop, ":", item[prop]);
    }
}