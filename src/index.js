import project from "./projects.js";
import { renderAllProjects, renderProject, renderToDoItem, expandToDoItem, addToDoItem } from "./ui-functions.js"; 
import "./styles.css";
import {listProjects} from "./state.js";

// only for testing purposes

const projects = listProjects();
console.log(projects);

const defaultProject = projects[Object.keys(projects)[0]]
console.log(defaultProject);

addToDoItem(defaultProject.id);
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

