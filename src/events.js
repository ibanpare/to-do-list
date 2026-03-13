import {
  expandToDoItem,
  deleteToDoItem,
  completeToDoItem,
  editToDoItem,
  renderAllProjects,
  addToDoItem,
  closeToDoModal,
  showToDoModal,
  handleProjectModal,
  addProject,
} from "./ui-functions.js";

export function clickHandler() {
  document.addEventListener("click", (event) => {
    const itemId = event.target.parentElement.id;
    if (
      event.target.matches(".to-do-title") ||
      event.target.matches(".to-do-subtitle")
    ) {
      console.log("title or subtitle");
      expandToDoItem(itemId);
    } else if (event.target.matches(".delete")) {
      deleteToDoItem(itemId);
    } else if (event.target.matches(".check_box")) {
      completeToDoItem(itemId);
    } else if (event.target.matches(".edit")) {
      editToDoItem(itemId);
    } else if (event.target.matches(".see-all-btn")) {
      const mainContainer = document.querySelector(".main-container");
      const mainContainerChildren = Array.from(mainContainer.children);
      // loop through each project in projects
      for (const child of mainContainerChildren) {
        mainContainer.removeChild(child);
      }
      renderAllProjects();
    } else if (event.target.matches(".add-to-do")) {
      showToDoModal();
    } else if (
      event.target.matches(".close") ||
      event.target.matches(".to-do-item-form-modal")
    ) {
      closeToDoModal();
    } else if (event.target.matches("#to-do-item-form-btn")) {
      addToDoItem();
    } else if (event.target.matches(".add-project")) {
      handleProjectModal("show");
    } else if (
      event.target.matches(".close-project-modal") ||
      event.target.matches(".add-project-form-modal")
    ) {
      handleProjectModal("close");
    } else if (event.target.matches("#project-form-btn")) {
      addProject();
    }
  });
}

clickHandler();
