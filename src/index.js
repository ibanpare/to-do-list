import { renderAllProjects, addToDoItem, addProject, clickToRenderAllProjects, showProject } from "./ui-functions.js"; 
import "./styles.css";
import {init} from "./state.js";

init();
renderAllProjects();
showProject();

addToDoItem();
addProject();
clickToRenderAllProjects();

//TO DO
//casini vari con gestione expand, non viene chiamato sempre e quindi se fai select proj poi non va, sistemare