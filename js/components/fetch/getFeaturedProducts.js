import displayMessage from "../renderMessage/displayMessage.js";
import { productsUrl } from "../../data/URLs.js";
import renderFeaturedProducts from "../renderHtml/renderFeaturedProducts.js";

export default async function getFeaturedProducts() {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();

        renderFeaturedProducts(products);
    } catch(error) {
        console.log(error);
        displayMessage("error", error, ".featured-grid");
    };
};