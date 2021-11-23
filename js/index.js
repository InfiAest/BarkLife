import stickyNav from "./utils/stickyNav.js";
import displayMessage from "./components/displayMessage.js";
import { productsUrl } from "./data/URLs.js";
import { renderFeaturedProducts } from "./components/renderProductCards.js";
import renderHeaderImage from "./components/renderHeaderImage.js";
import getSocialMediaAttests from "./components/getSocialAttests.js";
import createNavBar from "./components/createMenu.js";

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