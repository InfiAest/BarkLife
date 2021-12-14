import createNavBar from "../components/menu/createMenu.js";
import stickyNav from "../utils/stickyNav.js";
import { getExistingCartProducts, getExistingFavouriteProducts, getToken, saveToCart, saveToFavouriteProducts } from "../utils/storage.js";
import { baseUrl } from "../data/URLs.js";
import displayMessage from "../components/renderMessage/displayMessage.js";
import deleteProductButton from "../components/buttons/deleteProductButton.js";
import { validateURL, validatePrice } from "../components/forms/validation/regexValidations.js";
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
const nameError = document.querySelector("#product-name-error");
const imageUrlInput = document.querySelector("#image");
const imageError = document.querySelector("#product-image-error");
const imagePreview = document.querySelector(".preview-img-container");
const descriptionInput = document.querySelector("#description");
const descriptionError = document.querySelector("#product-description-error");
const priceInput = document.querySelector("#price");
const priceError = document.querySelector("#product-price-error");
const featuredCheckbox = document.querySelector(".featured-checkbox");
const idInput = document.querySelector("#id");
const pageTitle = document.querySelector("title");

previewProductImg();

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

form.addEventListener("submit", validateEditProductForm);

function validateEditProductForm(event) {
    event.preventDefault();

    // messageContainer.innerHTML = "";

    const nameValue = nameInput.value.trim();
    const imgValue = imageUrlInput.value.trim();
    const descriptionValue = descriptionInput.value.trim();
    const priceValue = priceInput.value.trim();
    const featuredValue = featuredCheckbox.checked;
    const idValue = idInput.value;

    var formIsValid = true;

    if (checkLength(nameInput.value, 3) === true) {
        nameError.style.display = "none";
        nameInput.style.borderColor = "#698678";
    } else {
        nameError.style.display = "block";
        nameInput.style.borderColor = "#ac6b63";
        formIsValid = false;
    }

    if (validateURL(imageUrlInput.value) === true) {
        imageError.style.display = "none";
        imageUrlInput.style.borderColor = "#698678";
        imagePreview.innerHTML = `<div class="preview-image" style="background-image: url('${imgValue}')"></div>`;
    } else {
        imageError.style.display = "block";
        imageUrlInput.style.borderColor = "#ac6b63";
        formIsValid = false;
    }

    if (checkLength(descriptionInput.value, 19) === true) {
        descriptionError.style.display = "none";
        descriptionInput.style.borderColor = "#698678";
    } else {
        descriptionError.style.display = "block";
        descriptionInput.style.borderColor = "#ac6b63";
        formIsValid = false;
    }

    if (validatePrice(priceInput.value)) {
        priceError.style.display = "none";
        priceInput.style.borderColor = "#698678";
    } else {
        priceError.style.display = "block";
        priceInput.style.borderColor = "#ac6b63";
        formIsValid = false;
    }

    if (formIsValid === true) {
        updateProduct(nameValue, imgValue, descriptionValue, priceValue, featuredValue, idValue);
    }

}


function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
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
            previewProductImg();
            nameInput.style.borderColor = "#ded6d3";
            imageUrlInput.style.borderColor = "#ded6d3";
            descriptionInput.style.borderColor = "#ded6d3";
            priceInput.style.borderColor = "#ded6d3";

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