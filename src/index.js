import toDo, { markAsDone, updateField, displayToDo } from "./to-do-item.js";
import "./styles.css";

console.log("Running")

const myToDo = toDo({name: "testName", description: "testDescr", notes: "testNotes", checklist: "none"})
console.log(myToDo);
displayToDo(myToDo);

