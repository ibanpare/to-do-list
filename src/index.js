import project, {addToProject, removeFromProject, getFromProject, displayProjectItems} from "./projects.js";
import toDo, { markAsDone, updateField, displayToDo } from "./to-do-item.js";
import { renderProject, renderToDoItem, expandToDoItem, addToDoItem } from "./ui-functions.js"; 
import "./styles.css";

// only for testing purposes
console.log("Running")

const defaultProject = project({name: "Default Project", description: "Default Project created at application start"});
const myToDo = toDo({name: "testName", description: "testDescr", notes: "testNotes", checklist: "none"})
addToProject(defaultProject, myToDo);

const myToDo2 = toDo({name: "test2", description: "testDescr", notes: "testNotes", checklist: "none"})
addToProject(defaultProject, myToDo2);

getFromProject(defaultProject,myToDo);

renderProject(defaultProject);

expandToDoItem();
addToDoItem(defaultProject);

/* TO DO
gestione pagina forse come scritto sotto
devo però fare render page ad ogni aggiunta di to do, project o click sui filtri, quindi è in realtà una UI function.


funzione che fa render page
che prende list all projects
e fa render to do item
per ogni item di ogni projects

ogni quanto si triggera? a page load basta? 
così quando creo to do item, faccio submit form, e refreshando parte tutto
poi con local storage andrà pure meglio
*/

