import stickyNav from "../utils/stickyNav.js";
import displayMessage from "../components/renderMessage/displayMessage.js";
import { productsUrl } from "../data/URLs.js";
import renderFeaturedProducts from "../components/renderHtml/renderFeaturedProducts.js";
import renderHeaderImage from "../components/renderHtml/renderHeaderImage.js";
import getSocialMediaAttests from "../components/renderHtml/getSocialAttests.js";
import createNavBar from "../components/menu/createMenu.js";
import loaderAnimation from "../components/loader/loaderAnimation.js";

//pageloader
window.onload = loaderAnimation();


createNavBar();

//Sticky nav
window.onscroll = function() {stickyNav()};

//Hero banner
renderHeaderImage();


//featured products
async function getFeaturedProducts() {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();

        renderFeaturedProducts(products);
    }
    catch(error) {
        console.log(error);
        displayMessage("error", error, ".featured-grid");
    }
}

getFeaturedProducts();

//Instagram attests
getSocialMediaAttests();