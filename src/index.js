import "./styles.css";
import {generateSideBar} from "./components/sidebar/initsidebar.js" ;
import { testingTodo } from "./components/maincontent/alltasks.js";
import {initDom} from "./components/DOM.js" ;

function display() {
     generateSideBar();
     testingTodo();
     initDom();
}

display();
