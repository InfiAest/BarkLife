import createMenu from "../components/menu/createMenu.js";
import stickyNav from "../components/menu/stickyNav.js";
import renderBasketProducts from "../components/renderHtml/renderBasketProducts.js";

//create menu and sticky nav
createMenu();
window.onscroll = function() {stickyNav()};
//load basket products
renderBasketProducts();





