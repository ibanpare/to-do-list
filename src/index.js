import project, {addToProject} from "./projects.js";
import toDo, { markAsDone, updateField, displayToDo } from "./to-do-item.js";
import "./styles.css";

console.log("Running")

const defaultProject = project({name: "Default Project", description: "Default Project created at application start"});
const myToDo = toDo({name: "testName", description: "testDescr", notes: "testNotes", checklist: "none"}, defaultProject)
addToProject(defaultProject, myToDo);
console.log(myToDo);
console.log(defaultProject);




