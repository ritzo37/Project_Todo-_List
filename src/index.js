import "./styles.css";
import {generateSideBar} from "./components/sidebar.js" ;
import { generateAllTasks } from "./components/alltasks.js";
import {initDom} from "./components/DOM.js" ;

function display() {
     generateSideBar();
     initDom();
     generateAllTasks();
}


display();
