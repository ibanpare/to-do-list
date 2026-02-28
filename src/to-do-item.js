//factory function to create to do items

export default function createToDoItem(item, projectId) {
    const id = crypto.randomUUID();
    let name = item.name;
    let description = item.description;
    let dueDate = (!item.dueDate) ? "endOfMonth" : item.dueDate;
    let priority = (!item.priority) ? "medium" : item.priority;
    let notes = item.notes;
    let checklist = item.checklist;
    let status = (!item.status) ? "open" : item.status;

    return {id, name, description, dueDate, priority, notes, checklist, status, projectId};
}
