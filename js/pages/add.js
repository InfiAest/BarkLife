import displayMessage from "../components/renderMessage/displayMessage.js";
import createNavBar from "../components/menu/createMenu.js";
import stickyNav from "../utils/stickyNav.js";
import { getToken } from "../utils/storage.js";
import { productsUrl } from "../data/URLs.js";
import renderImagePreview from "../components/renderHtml/renderImagePreview.js";
import previewProductImg from "../components/renderHtml/renderImagePreview.js";
import validateNewProductForm from "../components/forms/validation/validateNewProductForm.js";

const token = getToken();

if(!token) {
    location.href = "/";
}

createNavBar();

//Sticky nav
window.onscroll = function() {stickyNav()};

renderImagePreview();

const form = document.querySelector("form");

form.addEventListener("submit", validateNewProductForm);

export async function addNewProduct(nameValue, imageValue, descriptionValue, priceValue, featuredValue) {
    const name = document.querySelector("#name");
    const image = document.querySelector("#image");
    const description = document.querySelector("#description");
    const price = document.querySelector("#price");

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
        }
        if(json.error) {
            displayMessage("error", json.messageContainer, ".message-container");
        }

        console.log(json);

    }
    catch(error) {
        console.log(error);
    }

}

