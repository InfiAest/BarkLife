import displayMessage from "../../renderMessage/displayMessage.js";
import { productsUrl } from "../../../data/URLs.js";
import previewProductImg from "../../renderHtml/renderImagePreview.js";
import { getToken } from "../../../utils/storage.js";

export async function addNewProduct(nameValue, imageValue, descriptionValue, priceValue, featuredValue) {
    const form = document.querySelector("form");
    const name = document.querySelector("#name");
    const image = document.querySelector("#image");
    const description = document.querySelector("#description");
    const price = document.querySelector("#price");

    const token = getToken();

    const data = JSON.stringify({ name: nameValue, image_URL: imageValue, description: descriptionValue, price: priceValue, featured: featuredValue });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(productsUrl, options);
        const json = await response.json();

        if(json.created_at) {
            displayMessage("success", "Product created", ".message-container");
            form.reset();
            name.style.borderColor = "#ded6d3";
            image.style.borderColor = "#ded6d3";
            description.style.borderColor = "#ded6d3";
            price.style.borderColor = "#ded6d3";
            previewProductImg();
        };
        if(json.error) {
            displayMessage("error", json.messageContainer, ".message-container");
        };
        console.log(json);
    } catch(error) {
        console.log(error);
    };
};