//factory function to create to do items

export default function createToDoItem(item) {
    const name = item.name;
    const description = item.description;
    const dueDate = (!item.dueDate) ? "endOfMonth" : item.dueDate;
    const priority = (!item.priority) ? "medium" : item.priority;
    const notes = item.notes;
    const checklist = item.checklist;
    const status = (!item.status) ? "open" : item.status;
    return {name, description, dueDate, priority, notes, checklist, status};
}