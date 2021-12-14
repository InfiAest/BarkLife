import createMenu from "../components/menu/createMenu.js";
import stickyNav from "../components/menu/stickyNav.js";
import renderCartProducts from "../components/renderHtml/renderCartProducts.js";

//create menu and sticky nav
createMenu();
window.onscroll = function() {stickyNav()};
//load cart products
renderCartProducts();





