import displayMessage from "./components/displayMessage.js";
import createNavBar from "./components/createMenu.js";
import { getToken } from "./utils/storage.js";
import { productsUrl } from "./data/URLs.js";

const token = getToken();

if(!token) {
    location.href = "/";
}

createNavBar();


const form = document.querySelector("form");
const name = document.querySelector("#name");
const image = document.querySelector("#image");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const featured = document.querySelector(".featured-checkbox");
const messageContainer = document.querySelector(".message-container");


form.addEventListener("submit", submitNewProduct);

function submitNewProduct(event) {
    event.preventDefault();

    messageContainer.innerHTML = "";

    const nameValue = name.value.trim();
    const imageValue = image.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = price.value.trim();
    const featuredValue = featured.checked;

    if (nameValue.length === 0 || imageValue.length === 0 || descriptionValue.length === 0 || priceValue.length === 0 || validateURL(imageValue) === false ) {
        return displayMessage("warning", "Supply proper values", ".message-container");
    }

    addNewProduct(nameValue, imageValue, descriptionValue, priceValue, featuredValue);

}

async function addNewProduct(name, imageValue, description, price, featured) {

    const data = JSON.stringify({ name: name, image_URL: imageValue, description: description, price: price, featured: featured });

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
        }
        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }

        console.log(json);

    }
    catch(error) {
        console.log(error);
    }

}


//validate url (ref:https://digitalfortress.tech/tips/top-15-commonly-used-regex/ & https://www.regexpal.com/?fam=104034)

function validateURL(url) {
    const regEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
    const patternMatches = regEx.test(url);
    return patternMatches;
}