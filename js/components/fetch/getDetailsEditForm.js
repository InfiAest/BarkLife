import { baseUrl } from "../../data/URLs.js";
import deleteProductButton from "../buttons/deleteProductButton.js";
import previewProductImg from "../renderHtml/renderImagePreview.js";

export default async function getDetailsEditForm() {

    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");

    if (!id) {
        document.location.href = "/";
    }

    const productUrl = baseUrl + "products/" + id;
    
    const form = document.querySelector(".edit-product-form");
    const loader = document.querySelector(".content-loader-container");
    const nameInput = document.querySelector("#name");
    const descriptionInput = document.querySelector("#description");
    const priceInput = document.querySelector("#price");
    const featuredCheckbox = document.querySelector(".featured-checkbox");
    const idInput = document.querySelector("#id");
    const pageTitle = document.querySelector("title");

    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        pageTitle.innerHTML += `${details.name}`;

        nameInput.value = details.name;
        descriptionInput.value = details.description;
        priceInput.value = details.price;
        featuredCheckbox.checked = details.featured;
        idInput.value = details.id;
        
        previewProductImg(details);
        deleteProductButton(details.id);
    } catch(error) {
        console.log(error);
    } finally {
        loader.style.display = "none";
        form.style.display = "block";
    };
};