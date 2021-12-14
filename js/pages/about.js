import stickyNav from "../components/menu/stickyNav.js";
import createNavBar from "../components/menu/createMenu.js";

//create menu and sticky nav
createNavBar();
window.onscroll = function() {stickyNav()};
