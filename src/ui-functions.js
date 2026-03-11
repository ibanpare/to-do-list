import {
  addToProject,
  createProject,
  listProjects,
  removeToDoItem,
  markAsDone,
  findProjectId,
  updateToDo,
} from "./state.js";
import toDo from "./to-do-item.js";

/*
TO DO
Separate render.js from events.js
Implement event delegation in events.js
I.e. listen for events on container and do something depending on target class/id/tagname
*/

export function renderToDoItem(item) {
  const toDoDiv = document.createElement("div");
  toDoDiv.classList.add("to-do-item");
  toDoDiv.setAttribute("id", item.id);

  const toDoTitle = document.createElement("h4");
  toDoTitle.classList.add("to-do-title");
  toDoTitle.textContent = `${item.name}, due ${item.dueDate}`;

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("material-symbols-outlined", "delete");
  deleteIcon.setAttribute("id", item.id);
  deleteIcon.textContent = "delete";

  const checkboxIcon = document.createElement("span");
  checkboxIcon.classList.add("material-symbols-outlined", "check_box");
  checkboxIcon.setAttribute("id", item.id);
  checkboxIcon.textContent = "check_box";

  const editIcon = document.createElement("span");
  editIcon.classList.add("material-symbols-outlined", "edit");
  editIcon.setAttribute("id", item.id);
  editIcon.textContent = "edit";

  const toDoContent = document.createElement("ul");
  toDoContent.classList.add("to-do-content", "collapsed");

  for (const prop in item) {
    const container = document.createElement("div");
    container.classList.add("to-do-content-container");
    const toDoContentLine = document.createElement("li");
    toDoContentLine.textContent = `${prop}: ${item[prop]}`;
    toDoContent.appendChild(container);
    container.appendChild(toDoContentLine);
  }

  const projectContainer = document.getElementById(`${item.projectId}`);

  projectContainer.appendChild(toDoDiv);
  toDoDiv.appendChild(toDoTitle);
  toDoDiv.appendChild(deleteIcon);
  toDoDiv.appendChild(checkboxIcon);
  toDoDiv.appendChild(editIcon);
  toDoDiv.appendChild(toDoContent);

  if (item.status === "closed") {
    toDoDiv.classList.toggle("done");
  }

  if (item.priority === "low") {
    toDoDiv.classList.add("low");
  } else if (item.priority === "medium") {
    toDoDiv.classList.add("medium");
  } else if (item.priority === "high") {
    toDoDiv.classList.add("high");
  } else if (item.priority === "urgent") {
    toDoDiv.classList.add("urgent");
  } else {
    toDoDiv.classList.add("none");
  }
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
    item.addEventListener("click", (event) => {
      markAsDone(event.target.id);
      renderAllProjects();
    });
  });
}

export function deleteToDoItem() {
  const deleteIcon = document.querySelectorAll(".delete");
  deleteIcon.forEach((item) => {
    item.addEventListener("click", (event) => {
      removeToDoItem(event.target.id);
      renderAllProjects();
    });
  });
}

export function editToDoItem() {
  const editIcon = document.querySelectorAll(".edit");

  //TO DO - ripetizioni deliranti, refactor

  editIcon.forEach((item) => {
    item.addEventListener("click", (event) => {
      //figure out where user is editing
      const itemDiv = event.target.parentElement;
      const itemId = event.target.parentElement.id;
      const projectId = findProjectId(itemId);
      const projects = listProjects();
      const item = projects[projectId].items[itemId];
      const toDoItemContent = itemDiv.querySelector(".to-do-content");
      toDoItemContent.classList.remove("collapsed");

      //clean up to do item content
      const toDoItemContentChildren = Array.from(toDoItemContent.children);
      for (const child of toDoItemContentChildren) {
        toDoItemContent.removeChild(child);
      }

      //create editForm
      const editForm = document.createElement("form");

      for (const attr in item) {
        const label = document.createElement("label");
        label.setAttribute("for", `to-do-${attr}`);
        label.textContent = attr;
        if (attr === "priority") {
          const select = document.createElement("select");
          select.setAttribute("name", `to-do-${attr}`);
          select.setAttribute("type", "text");
          select.setAttribute("id", `to-do-${attr}`);
          select.setAttribute("autofocus", "true");
          const options = ["none", "low", "medium", "high", "urgent"];
          for (const option of options) {
            const priorityOption = document.createElement("option");
            priorityOption.setAttribute("value", option);
            if (item.priority === option) {
              priorityOption.setAttribute("selected", true);
            }
            priorityOption.textContent = option;

            select.appendChild(priorityOption);
          }
          select.addEventListener("focusout", () => {
            updateToDo(itemId, attr, select.value);
          });

          select.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              renderAllProjects();
            }
          });
          /*
                        <option value="none" selected>None</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>

          */

          toDoItemContent.appendChild(editForm);
          editForm.appendChild(label);
          editForm.appendChild(select);
        } else {
          const input = document.createElement("input");
          input.setAttribute("name", `to-do-${attr}`);
          input.setAttribute("type", "text");
          input.setAttribute("id", `to-do-${attr}`);
          input.setAttribute("value", item[attr]);
          input.setAttribute("autofocus", "true");

          toDoItemContent.appendChild(editForm);
          editForm.appendChild(label);
          editForm.appendChild(input);

          input.addEventListener("focusout", () => {
            updateToDo(itemId, attr, input.value);
          });

          input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              renderAllProjects();
            }
          });
        }
      }
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
  editToDoItem();
}

export function clickToRenderAllProjects() {
  const projects = listProjects();
  const seeAllBtn = document.querySelector(".see-all-btn");
  seeAllBtn.addEventListener("click", () => {
    //clean up screen

    const mainContainer = document.querySelector(".main-container");
    const mainContainerChildren = Array.from(mainContainer.children);
    // loop through each project in projects
    for (const child of mainContainerChildren) {
      mainContainer.removeChild(child);
    }

    renderAllProjects(projects);
    expandToDoItem();
    completeToDoItem();
    deleteToDoItem();
    editToDoItem();
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

export function showProject() {
  const projects = listProjects();
  const projSelect = document.querySelector("select#show-project");
  for (const proj in projects) {
    const projOption = document.createElement("option");
    projOption.value = projects[proj].id;
    projOption.innerText = projects[proj].name;

    projSelect.appendChild(projOption);
  }

  projSelect.addEventListener("change", () => {
    //poi prende l'input, pulisce screen e chiama render project su quello
    const mainContainer = document.querySelector(".main-container");
    const mainContainerChildren = Array.from(mainContainer.children);
    // loop through each project in projects
    for (const child of mainContainerChildren) {
      mainContainer.removeChild(child);
    }
    const selectedProj = document.querySelector(
      "select#show-project option:checked",
    ).value;
    const projObj = projects[selectedProj];

    renderProject(projObj);
  });
}
