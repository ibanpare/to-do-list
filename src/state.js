import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "./storage.js";
import project from "./projects.js";

let projects = {};

/*                                                     
  2. During runtime → read/write from the in-memory projects                                                                                                                                                   
  3. After every change → sync the in-memory projects to localStorage  con commit()

*/

export function init() {
  const localStorageProjects = getFromLocalStorage("projects");
  if (localStorageProjects === null) {
    const defaultProject = project({
      name: "Default Project",
      description: "Default Project created at application start",
    });

    addToProjectsObject(defaultProject);
  } else {
    projects = localStorageProjects;
  }
}

export function listProjects() {
  return projects;
}

export function createProject(projectName, projectDescription) {
  const newProject = project({
    name: projectName,
    description: projectDescription,
  });
  addToProjectsObject(newProject);
  commit();
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

export function removeToDoItem(toDoItemId) {
  for (const proj in projects) {
    for (const item in projects[proj].items) {
      if (item === toDoItemId) {
        delete projects[proj].items[toDoItemId];
      }
    }
  }
  commit();
}

export function markAsDone(toDoItemId) {
  for (const proj in projects) {
    for (const item in projects[proj].items) {
      if (item === toDoItemId) {
        if (projects[proj].items[toDoItemId].status === "closed") {
          projects[proj].items[toDoItemId].status = "open";
        } else {
          projects[proj].items[toDoItemId].status = "closed";
        }
      }
    }
  }
  commit();
}

export function findProjectId(toDoItemId) {
  for (const proj in projects) {
    for (const item in projects[proj].items) {
      if (item === toDoItemId) {
        return projects[proj].id;
      }
    }
  }
}

export function updateToDo(toDoItemID, property, value) {
  const projectId = findProjectId(toDoItemID);
  projects[projectId].items[toDoItemID][property] = value;
  commit();
}