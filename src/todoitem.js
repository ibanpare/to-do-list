/*

- I'll generate todos with a factory function, I prefer them to classes 
- todos will have
    - title
    - description
    - due date
    - priority
    - notes (v2)
    - checklist (v2)

*/

function createTodo(title, description = '', dueDate = '', priority = '', notes = '', checklist = '') {

    return { title, description, dueDate, priority, notes, checklist };
}

export { createTodo };