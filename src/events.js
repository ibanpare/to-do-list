export function clickHandler() {
  document.addEventListener("click", (event) => {
    const itemId = event.target.parentElement.id;
    if (
      event.target.matches(".to-do-title") ||
      event.target.matches(".to-do-subtitle")
    ) {
      console.log("title or subtitle");
      //expandToDoItem(itemId);
    } else if (event.target.className === "material-symbols-outlined delete") {
      //deleteToDoItem(itemId);
      console.log("delete");
    } else if (
      event.target.className === "material-symbols-outlined check_box"
    ) {
      console.log("complete");
      //completeToDoItem(itemId);
    } else if (event.target.className === "material-symbols-outlined edit") {
      console.log("edit");
      //editToDoItem(itemId);
    }
  });
}

clickHandler();
