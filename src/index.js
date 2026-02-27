import project, {addToProject, removeFromProject, getFromProject, displayProjectItems} from "./projects.js";
import toDo, { markAsDone, updateField, displayToDo } from "./to-do-item.js";
import { renderAllProjects, renderProject, renderToDoItem, expandToDoItem, addToDoItem } from "./ui-functions.js"; 
import "./styles.css";

// only for testing purposes

const defaultProject = project({name: "Default Project", description: "Default Project created at application start"});


addToDoItem(defaultProject);
renderAllProjects(defaultProject);

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

