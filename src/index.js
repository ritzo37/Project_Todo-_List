import "./styles.css";
import {generateSideBar} from "./components/sidebar.js" ;
import { testingTodo } from "./components/alltasks.js";
import {initDom} from "./components/DOM.js" ;

function display() {
     generateSideBar();
     initDom();
     const element = document.querySelector(`[data-sexy="${2}"]`);
console.log(element.textContent);
}


display();
