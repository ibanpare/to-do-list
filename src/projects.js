//factory function to create to do item projects

export default function createProject(project) {
    let id = crypto.randomUUID();
    let name = project.name;
    let description = project.description;

    let items = []

    return {id, name, description, items};
}

export function addToProject(project, toDoItem) {
    toDoItem.projectId = project.id;
    project.items.push(toDoItem);
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

export function listProjects() {
    // list available projects, I assume from local storage
}