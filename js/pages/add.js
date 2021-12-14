import displayMessage from "../components/renderMessage/displayMessage.js";
import createNavBar from "../components/menu/createMenu.js";
import stickyNav from "../utils/stickyNav.js";
import { getToken } from "../utils/storage.js";
import { productsUrl } from "../data/URLs.js";
import renderImagePreview from "../components/renderHtml/renderImagePreview.js";
import { validatePrice, validateURL } from "../components/forms/validation/regexValidations.js";
import previewProductImg from "../components/renderHtml/renderImagePreview.js";

const token = getToken();

if(!token) {
    location.href = "/";
}

createNavBar();

//Sticky nav
window.onscroll = function() {stickyNav()};

renderImagePreview();


const form = document.querySelector("form");
const name = document.querySelector("#name");
const nameError = document.querySelector("#product-name-error");
const image = document.querySelector("#image");
const imageError = document.querySelector("#product-image-error");
const description = document.querySelector("#description");
const descriptionError = document.querySelector("#product-description-error");
const price = document.querySelector("#price");
const priceError = document.querySelector("#product-price-error");
const featured = document.querySelector(".featured-checkbox");


form.addEventListener("submit", validateNewProductForm);

function validateNewProductForm(event) {
    event.preventDefault();

    const nameValue = name.value.trim();
    const imageValue = image.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = price.value.trim();
    const featuredValue = featured.checked;

    var formIsValid = true;

    if (checkLength(name.value, 3) === true) {
        nameError.style.display = "none";
        name.style.borderColor = "#698678";
    } else {
        nameError.style.display = "block";
        name.style.borderColor = "#ac6b63";
        formIsValid = false;
    }

    if (validateURL(image.value) === true) {
        imageError.style.display = "none";
        image.style.borderColor = "#698678";
    } else {
        imageError.style.display = "block";
        image.style.borderColor = "#ac6b63";
        formIsValid = false;
    }

    if (checkLength(description.value, 19) === true) {
        descriptionError.style.display = "none";
        description.style.borderColor = "#698678";
    } else {
        descriptionError.style.display = "block";
        description.style.borderColor = "#ac6b63";
        formIsValid = false;
    }

    if (validatePrice(price.value)) {
        priceError.style.display = "none";
        price.style.borderColor = "#698678";
    } else {
        priceError.style.display = "block";
        price.style.borderColor = "#ac6b63";
        formIsValid = false;
    }

    if (formIsValid === true) {
        addNewProduct(nameValue, imageValue, descriptionValue, priceValue, featuredValue);
    }

}

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}


async function addNewProduct(nameValue, imageValue, descriptionValue, priceValue, featuredValue) {

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

