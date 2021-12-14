import stickyNav from "../components/menu/stickyNav.js";
import createNavBar from "../components/menu/createMenu.js";
import loaderAnimation from "../components/loader/loaderAnimation.js";
import getAllProducts from "../components/fetch/getAllProducts.js";

//pageloader
window.onload = loaderAnimation();

//create menu and sticky nav
createNavBar();
window.onscroll = function() {stickyNav()};

//featured products
getAllProducts();
