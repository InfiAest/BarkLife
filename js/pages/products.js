import stickyNav from "../utils/stickyNav.js";
import { productsUrl } from "../data/URLs.js";
import renderAllProducts from "../components/renderHtml/renderAllProducts.js";
import { productsContainer } from "../settings/productsContainer.js";
import displayMessage from "../components/renderMessage/displayMessage.js";
import { searchProducts } from "../components/search/searchProducts.js";
import createNavBar from "../components/menu/createMenu.js";
import loaderAnimation from "../components/loader/loaderAnimation.js";

//pageloader
window.onload = loaderAnimation();


createNavBar();

//Sticky nav
window.onscroll = function() {stickyNav()};

//featured products
async function getAllProducts() {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();
        
        renderAllProducts(products, productsContainer);
        searchProducts(products);
    }
    catch(error) {
        console.log(error);
        displayMessage("error", error, ".product-grid");
    }
}

getAllProducts();
