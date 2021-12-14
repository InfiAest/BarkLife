import { productsUrl } from "../../data/URLs.js";
import renderAllProducts from "../renderHtml/renderAllProducts.js";
import displayMessage from "../renderMessage/displayMessage.js";
import { searchProducts } from "../search/searchProducts.js";

export default async function getAllProducts() {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();
        
        renderAllProducts(products);
        searchProducts(products);
    } catch(error) {
        console.log(error);
        displayMessage("error", error, ".product-grid");
    };
};