import project from "./projects.js";
import { renderAllProjects, renderProject, renderToDoItem, expandToDoItem, addToDoItem, addProject, clickToRenderAllProjects, completeToDoItem } from "./ui-functions.js"; 
import "./styles.css";
import {init, listProjects} from "./state.js";

init();
const projects = listProjects();
console.log(projects);
renderAllProjects(projects);

addToDoItem();
addProject();
clickToRenderAllProjects(projects);
