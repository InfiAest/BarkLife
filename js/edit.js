import { productsUrl } from "./data/URLs.js";
import { getToken } from "./utils/storage.js";
import displayMessage from "./components/displayMessage.js";
import createNavBar from "./components/createMenu.js";
import deleteProductButton from "./components/deleteProductButton.js";

const token = getToken();
console.log(token);

if(!token) {
    location.href = "/";
}

createNavBar();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
    document.location.href = "/";
}

const detailsUrl = productsUrl + id;

const form = document.querySelector("form");
const name = document.querySelector("#name");
const image = document.querySelector("#image");
const imagePreview = document.querySelector(".preview-img-container");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const featured = document.querySelector(".featured-checkbox");
const idInput = document.querySelector("#id")
const messageContainer = document.querySelector(".message-container");
const pageTitle = document.querySelector("title");

(async function() {

    try {
        const response = await fetch(detailsUrl);
        const details = await response.json();

        pageTitle.innerHTML += `${details.name}`;

        name.value = details.name;
        image.value = details.image_URL;
        description.value = details.description;
        price.value = details.price;
        featured.checked = details.featured;
        idInput.value = details.id;

        imagePreview.innerHTML = `<div class="preview-image" style="background-image: url('${image.value}');"></div>`;


        console.log(details);
        deleteProductButton(details.id);
    }
    catch (error) {
        console.log(error);
    }

})();


form.addEventListener("submit", editProduct);

function editProduct(event) {
    event.preventDefault();

    messageContainer.innerHTML = "";

    const nameValue = name.value.trim();
    const imageValue = image.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = price.value.trim();
    const featuredValue = featured.checked;
    const idValue = idInput.value;
    
    if (nameValue.length === 0 || imageValue.length === 0 || descriptionValue.length === 0 || priceValue.length === 0 || isNaN(priceValue)) {
        return displayMessage("warning", "Supply proper values", ".message-container");
    }

    updateProduct(nameValue, imageValue, descriptionValue, priceValue, featuredValue, idValue);
}

async function updateProduct(name, imageValue, price, description, featured, id) {

    const url = productsUrl + id;
    const data = JSON.stringify({ name: name, image_URL: imageValue, price: price, description: description, featured: featured });

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.updated_at) {
            displayMessage("success", "Article updated", ".message-container");
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    }
    catch (error) {
        console.log(error);
    }

}
