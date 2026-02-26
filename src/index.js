import project, {addToProject, removeFromProject, getFromProject, displayProjectItems} from "./projects.js";
import toDo, { markAsDone, updateField, displayToDo } from "./to-do-item.js";
import { renderProject, renderToDoItem, expandToDoItem, addToDoItem } from "./ui-functions.js"; 
import "./styles.css";

console.log("Running")

const defaultProject = project({name: "Default Project", description: "Default Project created at application start"});
const myToDo = toDo({name: "testName", description: "testDescr", notes: "testNotes", checklist: "none"})
addToProject(defaultProject, myToDo);

const myToDo2 = toDo({name: "test2", description: "testDescr", notes: "testNotes", checklist: "none"})
addToProject(defaultProject, myToDo2);

getFromProject(defaultProject,myToDo);

renderProject(defaultProject);

/* TO DO
funzione che fa render page
che prende list all projects
e fa render to do item
per ogni item di ogni projects
*/

renderToDoItem(myToDo);
renderToDoItem(myToDo2);
expandToDoItem();
addToDoItem(defaultProject);