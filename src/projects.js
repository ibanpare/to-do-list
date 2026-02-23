//factory function to create to do item projects

export default function createProject(project) {
    let id = crypto.randomUUID();
    let name = project.name;
    let description = project.description;

    let items = []

    return {id, name, description, items};
}

export function addToProject(project, toDoItem) {
    project.items.push(toDoItem);
} 

export function removeFromProject(project, toDoItem) {
    // TO DO
}

export function getFromProject(project, toDoItem) {
    // TO DO
}

export function displayFromProject(project) {
    // TO DO
}