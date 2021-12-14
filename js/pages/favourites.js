import stickyNav from "../components/menu/stickyNav.js";
import createNavBar from "../components/menu/createMenu.js";
import renderFavouriteProducts from "../components/renderHtml/renderFavourites.js";

//create menu and sticky nav
createNavBar();
window.onscroll = function() {stickyNav()};

//load favourite products
renderFavouriteProducts();



