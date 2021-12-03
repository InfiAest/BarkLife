import createMenu from "../components/menu/createMenu.js";
import stickyNav from "../utils/stickyNav.js";
import renderCartProducts from "../components/renderHtml/renderCartProducts.js";

createMenu();

//Sticky nav
window.onscroll = function() {stickyNav()};

renderCartProducts();





