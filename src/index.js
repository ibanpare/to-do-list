import "./styles.css";
import { createTodo } from "./todoitem.js";

const testTodo = createTodo("TestTitle", "Description", "12/12/2026", "High", "This is just a little test", ["firstCheck", "secondCheck", "thirdCheck"]);
console.log(testTodo);

for (const property in testTodo) {
  console.log(`${property}: ${testTodo[property]}`);
}
