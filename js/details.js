import stickyNav from "./utils/stickyNav.js";
import { productsUrl } from "./data/URLs.js";
import displayMessage from "./components/displayMessage.js";
import renderProductDetails from "./components/renderProductDetails.js";
import createNavBar from "./components/createMenu.js";

createNavBar();

//Sticky nav
window.onscroll = function() {stickyNav()};


//get specific product
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getProductDetails() {
    try {
        const response = await fetch(productsUrl + id);
        const product = await response.json();

        renderProductDetails(product);
    }
    catch(error) {
        console.log(error);
        displayMessage("error", error, ".product-container");
    }
}

getProductDetails();


//add to cart button
