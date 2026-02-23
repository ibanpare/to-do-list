//factory function to create to do items

export default function createToDoItem(item) {
    let name = item.name;
    let description = item.description;
    let dueDate = (!item.dueDate) ? "endOfMonth" : item.dueDate;
    let priority = (!item.priority) ? "medium" : item.priority;
    let notes = item.notes;
    let checklist = item.checklist;
    let status = (!item.status) ? "open" : item.status;

    let projectId = "default";

    return {name, description, dueDate, priority, notes, checklist, status, projectId};
}

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