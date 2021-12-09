import createNavBar from "../components/menu/createMenu.js";
import stickyNav from "../utils/stickyNav.js";
import { getExistingCartProducts, getExistingFavouriteProducts, getToken, saveToCart, saveToFavouriteProducts } from "../utils/storage.js";
import { baseUrl } from "../data/URLs.js";
import displayMessage from "../components/renderMessage/displayMessage.js";
import renderImagePreview from "../components/renderHtml/renderImagePreview.js";
import deleteProductButton from "../components/buttons/deleteProductButton.js";
import { validateURL } from "../utils/regexValidations.js";
import loaderAnimation from "../components/loader/loaderAnimation.js";

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
const messageContainer = document.querySelector(".message-container");
const nameInput = document.querySelector("#name");
const imageUrlInput = document.querySelector("#image");
const imagePreview = document.querySelector(".preview-img-container");
const descriptionInput = document.querySelector("#description");
const priceInput = document.querySelector("#price");
const featuredCheckbox = document.querySelector(".featured-checkbox");
const idInput = document.querySelector("#id");
const pageTitle = document.querySelector("title");

renderImagePreview();

(async function() {
    try {
        const response = await fetch(productUrl);
        const details = await response.json();

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

form.addEventListener("submit", editProduct);

function editProduct(event) {
    event.preventDefault();

    messageContainer.innerHTML = "";

    const nameValue = nameInput.value.trim();
    const imgValue = imageUrlInput.value.trim();
    const descriptionValue = descriptionInput.value.trim();
    const priceValue = priceInput.value.trim();
    const featuredValue = featuredCheckbox.checked;
    const idValue = idInput.value;

    imagePreview.innerHTML = `<div class="preview-image" style="background-image: url('${imgValue}')"></div>`;

    if (nameValue.length === 0 || imgValue.length === 0 || descriptionValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || validateURL(imgValue) === false) {
        return displayMessage("warning", "Supply proper values", ".message-container");
    }

    updateProduct(nameValue, imgValue, descriptionValue, priceValue, featuredValue, idValue);
}

async function updateProduct(name, imgValue, description, price, featured, id) {
    const url = baseUrl + "products/" + id;
    const data = JSON.stringify({ name: name, image_URL: imgValue, description: description, price: price, featured: featured });

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
            console.log(json)
            displayMessage("success", "Product updated", ".message-container");

            //update product if it's in the favourites
            const currentFavourites = getExistingFavouriteProducts();
                const productExistsInFavs = currentFavourites.find(function(product) {
                    return product.id === id;
                });

            if (productExistsInFavs) {
                const updatedFavouriteProducts = currentFavourites.filter(product => product.id !== id);
                saveToFavouriteProducts(updatedFavouriteProducts);

                const updatedProduct = { id: id, name: name, image: imgValue, description: description, price: price, featured: featured };
                const newFavouriteProducts = getExistingFavouriteProducts();
                newFavouriteProducts.push(updatedProduct);
                saveToFavouriteProducts(newFavouriteProducts);
            }

            //update product if it's in the cart
            const currentCartProducts = getExistingCartProducts();
            const productExistsInCart = currentCartProducts.find(function(product) {
                return product.id === id;
            });

            if (productExistsInCart) {
                //get quantity of that item in the cart
                const quantityInCart = productExistsInCart.quantity;
                const updatedCartProducts = currentCartProducts.filter(product => product.id !== id);
                saveToCart(updatedCartProducts);

                const updatedProduct = { id: id, name: name, image: imgValue, description: description, price: price, featured: featured, quantity: quantityInCart }
                const newCartProducts = getExistingCartProducts();
                newCartProducts.push(updatedProduct);
                saveToCart(newCartProducts);
            }
        }
        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    }
    catch(error) {
        console.log(error);
    }
}