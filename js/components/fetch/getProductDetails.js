import { productsUrl } from "../../data/URLs.js";
import displayMessage from "../renderMessage/displayMessage.js";
import renderProductDetails from "../renderHtml/renderProductDetails.js";

export default async function getProductDetails() {

    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");

    try {
        const response = await fetch(productsUrl + id);
        const product = await response.json();

        renderProductDetails(product);
    } catch(error) {
        console.log(error);
        displayMessage("error", error, ".product-container");
    };
};