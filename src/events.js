import {
  expandToDoItem,
  deleteToDoItem,
  completeToDoItem,
  editToDoItem,
  renderAllProjects,
  addToDoItem,
  closeModal,
  showModal,
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
    } else if (event.target.className === "material-symbols-outlined delete") {
      deleteToDoItem(itemId);
      console.log("delete");
    } else if (
      event.target.className === "material-symbols-outlined check_box"
    ) {
      console.log("complete");
      completeToDoItem(itemId);
    } else if (event.target.className === "material-symbols-outlined edit") {
      console.log("edit");
      editToDoItem(itemId);
    } else if (event.target.matches(".see-all-btn")) {
      const mainContainer = document.querySelector(".main-container");
      const mainContainerChildren = Array.from(mainContainer.children);
      // loop through each project in projects
      for (const child of mainContainerChildren) {
        mainContainer.removeChild(child);
      }

      //ADD PROJECT

      renderAllProjects();
    } else if (event.target.matches(".add-to-do")) {
      showModal();
    } else if (
      event.target.matches(".close") ||
      event.target.matches(".to-do-item-form-modal")
    ) {
      closeModal();
    } else if (event.target.matches("#to-do-item-form-btn")) {
      addToDoItem();
    }
  });
}

clickHandler();
