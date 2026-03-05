import { renderAllProjects, addToDoItem, addProject, clickToRenderAllProjects, showProject } from "./ui-functions.js"; 
import "./styles.css";
import {init} from "./state.js";

init();
renderAllProjects();
showProject();

addToDoItem();
addProject();
clickToRenderAllProjects();
