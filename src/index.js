import toDo, { markAsDone, changeDueDate, updateField } from "./to-do-item.js";
import "./styles.css";

console.log("Running")

const myToDo = toDo({name: "testName", description: "testDescr", notes: "testNotes", checklist: "none"})
console.log(myToDo);
console.log(myToDo.description);
updateField(myToDo, "description", "new descr");
console.log(myToDo.description);
console.log(myToDo.notes);
updateField(myToDo, "notes", "new notes");
console.log(myToDo.notes);

