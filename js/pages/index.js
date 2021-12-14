import stickyNav from "../components/menu/stickyNav.js";
import renderHeaderImage from "../components/renderHtml/renderHeaderImage.js";
import getSocialMediaAttests from "../components/fetch/getSocialAttests.js";
import createNavBar from "../components/menu/createMenu.js";
import loaderAnimation from "../components/loader/loaderAnimation.js";
import getFeaturedProducts from "../components/fetch/getFeaturedProducts.js";

//pageloader
window.onload = loaderAnimation();

//create menu and sticky nav
createNavBar();
window.onscroll = function() {stickyNav()};

//load hero banner
renderHeaderImage();

//featured products
getFeaturedProducts();

//Instagram attests
getSocialMediaAttests();