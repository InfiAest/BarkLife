import stickyNav from "../utils/stickyNav.js";
import createNavBar from "../components/menu/createMenu.js";

createNavBar();

//Sticky nav
window.onscroll = function() {stickyNav()};
