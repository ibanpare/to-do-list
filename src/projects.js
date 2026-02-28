//factory function to create to do item projects

export default function createProject(project) {
    const id = crypto.randomUUID();
    let name = project.name;
    let description = project.description;

    let items = {};

    return {id, name, description, items};
}
