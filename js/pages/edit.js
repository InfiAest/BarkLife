import createNavBar from "../components/menu/createMenu.js";
import stickyNav from "../utils/stickyNav.js";
import { getToken } from "../utils/storage.js";
import { baseUrl } from "../data/URLs.js";
import validateEditProductForm from "../components/forms/validation/validateEditProductForm.js";
import deleteProductButton from "../components/buttons/deleteProductButton.js";
import loaderAnimation from "../components/loader/loaderAnimation.js";
import previewProductImg from "../components/renderHtml/renderImagePreview.js";

const token = getToken();

if (!token) {
    location.href = "/";
}

//pageloader
window.onload = loaderAnimation();


createNavBar();

//Sticky nav
window.onscroll = function() {stickyNav()};

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
const imageUrlInput = document.querySelector("#image");
const descriptionInput = document.querySelector("#description");
const priceInput = document.querySelector("#price");
const featuredCheckbox = document.querySelector(".featured-checkbox");
const idInput = document.querySelector("#id");
const pageTitle = document.querySelector("title");

previewProductImg();

form.addEventListener("submit", validateEditProductForm);

(async function() {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

        previewProductImg();

        pageTitle.innerHTML += `${details.name}`;

        nameInput.value = details.name;
        imageUrlInput.value = details.image_URL;
        descriptionInput.value = details.description;
        priceInput.value = details.price;
        featuredCheckbox.checked = details.featured;
        idInput.value = details.id;
        
        previewImg.src = `${details.image_URL}`;

        deleteProductButton(details.id);

        
    }
    catch(error) {
        console.log(error);
    }
    finally {
        loader.style.display = "none";
        form.style.display = "block";
    }
})();

