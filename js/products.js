import stickyNav from "./utils/stickyNav.js";
import renderHeaderImage from "./components/renderHeaderImage.js";
import { productsUrl } from "./data/URLs.js";
import { renderAllProducts } from "./components/renderProductCards.js";
import displayMessage from "./components/displayMessage.js";
import { searchProducts } from "./components/searchProducts.js";
import createNavBar from "./components/createMenu.js";

createNavBar();

//Sticky nav
window.onscroll = function() {stickyNav()};

//Hero banner
renderHeaderImage();

//featured products
async function getAllProducts() {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();
        
        renderAllProducts(products);
        searchProducts(products);
    }
    catch(error) {
        console.log(error);
        displayMessage("error", error, ".product-grid");
    }
}

getAllProducts();
