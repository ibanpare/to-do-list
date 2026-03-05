import { renderAllProjects, renderProject, renderToDoItem, expandToDoItem, addToDoItem, addProject, clickToRenderAllProjects, completeToDoItem, showProject } from "./ui-functions.js"; 
import "./styles.css";
import {init, listProjects} from "./state.js";

init();
renderAllProjects();
showProject();

addToDoItem();
addProject();
clickToRenderAllProjects();
