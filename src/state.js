import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage} from "./storage.js";
import project from "./projects.js"

let projects = {};

/*                                                     
  2. During runtime → read/write from the in-memory projects                                                                                                                                                   
  3. After every change → sync the in-memory projects to localStorage  con commit()

*/

export function init() {
    //this should get from localStorage first
    const localStorageProjects = getFromLocalStorage("projects");
    if(localStorageProjects === null) {
        const defaultProject = project({name: "Default Project", description: "Default Project created at application start"});

        addToProjectsObject(defaultProject);
    }
    else {
        projects = localStorageProjects;
    }
}

export function listProjects() {
    return projects;
}

export function addToProjectsObject(project) {
    projects[project.id] = project;
    commit();
} 


export function addToProject(projectId, toDoItem) {
    projects[projectId].items[toDoItem.id] = toDoItem;
    commit();
} 

function commit() {
    removeFromLocalStorage("projects");
    saveToLocalStorage("projects", projects);
}

/*

qui mettiamo tutte le logiche di aggiornamento,
quando chiamare storage
funzioni tipo add to do ecc

l'array dei progetti, che non esporremo
esporremo solo list projects

*/

//    saveToLocalStorage(name, JSON.stringify{id, name, description, items});

//Project functions (TUTTE DA SISTEMARE)



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