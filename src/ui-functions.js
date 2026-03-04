import toDo, { markAsDone, updateField, displayToDo } from "./to-do-item.js";
import {
  addToProject,
  createProject,
  listProjects,
  removeToDoItem,
} from "./state.js";

export function renderToDoItem(item) {
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("to-do-item");
  toDoDiv.setAttribute("id", item.id);

  const toDoTitle = document.createElement("h4");
  toDoTitle.classList.add("to-do-title");
  toDoTitle.textContent = `- ${item.name}, due ${item.dueDate}`;

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("material-symbols-outlined", "delete");
  deleteIcon.setAttribute("id", item.id);
  deleteIcon.textContent = "delete";

  const checkboxIcon = document.createElement("span");
  checkboxIcon.classList.add("material-symbols-outlined", "check_box");
  checkboxIcon.setAttribute("id", item.id);
  checkboxIcon.textContent = "check_box";

  const toDoContent = document.createElement("ul");
  toDoContent.classList.add("to-do-content", "collapsed");

  for (const prop in item) {
    if (prop === "name" || prop === "dueDate") continue;
    const toDoContentLine = document.createElement("li");
    toDoContentLine.textContent = `${prop}: ${item[prop]}`;
    toDoContent.appendChild(toDoContentLine);
  }

  const projectContainer = document.getElementById(`${item.projectId}`);

  projectContainer.appendChild(toDoDiv);
  toDoDiv.appendChild(toDoTitle);
  toDoDiv.appendChild(deleteIcon);
  toDoDiv.appendChild(checkboxIcon);
  toDoDiv.appendChild(toDoContent);
}

export function expandToDoItem() {
  const toDoTitle = document.querySelectorAll(".to-do-title");
  toDoTitle.forEach((item) =>
    item.addEventListener("click", function (event) {
      const toDoItemDiv = event.target.parentElement;
      const toDoItemContent = toDoItemDiv.querySelector(".to-do-content");
      toDoItemContent.classList.toggle("collapsed");
    }),
  );
}

export function completeToDoItem() {
  //POSSIBLE REFACTOR in a single one for expand, complete, delete
  const checkbox = document.querySelectorAll(".check_box");
  checkbox.forEach((item) => {
    item.addEventListener("click", () => {
      console.log("checkbox clicked");
    });
  });
}

export function deleteToDoItem() {
  const deleteIcon = document.querySelectorAll(".delete");
  deleteIcon.forEach((item) => {
    item.addEventListener("click", (event) => {
      console.log("delete clicked");
      console.log(event.target.id);
      removeToDoItem(event.target.id);
      renderAllProjects();
    });
  });
}

export function addToDoItem() {
  /* TO DO

    per ora dovrò sempre chiamare renderToDoItem dopo averlo creato
    poi in teoria se submit fa refresh page siamo a posto

    Ho dubbi su come spacchettare, sicuramnete c'è troppa roba, intanto faccio questo monster e poi vediamo
    */

  const addBtn = document.querySelector(".add-to-do");
  const formModal = document.querySelector(".to-do-item-form-modal");
  const closeBtn = formModal.querySelector(".close");
  const projectSelect = document.querySelector("select#project-select");

  (function createProjectSelectOptions() {
    const projects = listProjects();

    for (const proj in projects) {
      const projectOption = document.createElement("option");
      projectOption.value = proj;
      projectOption.textContent = projects[proj].name;
      projectSelect.appendChild(projectOption);
    }
  })();

  addBtn.addEventListener("click", () => {
    formModal.style.display = "block";
  });
  closeBtn.addEventListener("click", () => {
    formModal.style.display = "none";
  });

  const submitBtn = formModal.querySelector("button[type='submit']");
  submitBtn.addEventListener("click", () => {
    console.log("submitted");

    const toDoName = document.querySelector("input#to-do-name").value;
    const toDoDescription = document.querySelector(
      "input#to-do-description",
    ).value;
    const toDoPriority = document.querySelector("select#to-do-priority").value;
    const toDoDueDate = document.querySelector("input#to-do-dueDate").value;
    const toDoNotes = document.querySelector("textarea#to-do-notes").value;
    const projectId = document.querySelector(
      "#project-select option:checked",
    ).value;

    const myToDo = toDo(
      {
        name: toDoName,
        description: toDoDescription,
        priority: toDoPriority,
        dueDate: toDoDueDate,
        notes: toDoNotes,
      },
      projectId,
    );

    addToProject(projectId, myToDo);

    formModal.style.display = "none";
    renderAllProjects();
  });

  //close modal if user clicks out
  window.onclick = (event) => {
    if (event.target == formModal) {
      formModal.style.display = "none";
    }
  };
}

export function renderAllProjects() {
  const projects = listProjects();
  const mainContainer = document.querySelector(".main-container");
  const mainContainerChildren = Array.from(mainContainer.children);
  for (const child of mainContainerChildren) {
    mainContainer.removeChild(child);
  }
  for (const proj in projects) {
    renderProject(projects[proj]);
  }
  expandToDoItem();
  completeToDoItem();
  deleteToDoItem();
}

export function clickToRenderAllProjects() {
  const projects = listProjects();
  const seeAllBtn = document.querySelector(".see-all-btn");
  seeAllBtn.addEventListener("click", () => {
    //clean up screen

    const mainContainer = document.querySelector(".main-container");
    const mainContainerChildren = Array.from(mainContainer.children);
    for (const child of mainContainerChildren) {
      mainContainer.removeChild(child);
    }
    // loop through each project in projects
    renderAllProjects(projects);
    expandToDoItem();
    completeToDoItem();
    deleteToDoItem();
  });
}

export function renderProject(project) {
  const projectDiv = document.createElement("div");
  const projectTitle = document.createElement("h3");
  const projectDescription = document.createElement("p");
  projectDiv.setAttribute("class", "project-container");
  projectDiv.setAttribute("id", project.id);

  projectTitle.textContent = `${project.name}`;
  projectDescription.textContent = `${project.description}`;

  const mainContainer = document.querySelector(".main-container");
  mainContainer.appendChild(projectDiv);
  projectDiv.appendChild(projectTitle);
  projectDiv.appendChild(projectDescription);

  for (const item in project.items) {
    renderToDoItem(project.items[item]);
  }
}

export function addProject() {
  const addBtn = document.querySelector(".add-project");
  const formModal = document.querySelector(".add-project-form-modal");
  const closeBtn = formModal.querySelector(".close");
  addBtn.addEventListener("click", () => {
    formModal.style.display = "block";
  });
  closeBtn.addEventListener("click", () => {
    formModal.style.display = "none";
  });

  const submitBtn = formModal.querySelector("button[type='submit']");
  submitBtn.addEventListener("click", () => {
    console.log("submitted");

    const ProjectName = document.querySelector("input#project-name").value;
    const ProjectDescription = document.querySelector(
      "input#project-description",
    ).value;

    createProject(ProjectName, ProjectDescription);

    formModal.style.display = "none";
    renderAllProjects();
  });

  //close modal if user clicks out
  window.onclick = (event) => {
    if (event.target == formModal) {
      formModal.style.display = "none";
    }
  };
}
