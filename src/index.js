import project from "./projects.js";
import { renderAllProjects, renderProject, renderToDoItem, expandToDoItem, addToDoItem, addProject, clickToRenderAllProjects } from "./ui-functions.js"; 
import "./styles.css";
import {init, listProjects} from "./state.js";

init();
const projects = listProjects();
console.log(projects);
renderAllProjects(projects);

addToDoItem("9afc4e3e-f879-4b8a-8bda-a44e886438ec");
addProject();
clickToRenderAllProjects(projects);
