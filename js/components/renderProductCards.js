import { EMPTY_RESULTS } from "../settings/messages.js";
import displayMessage from "./displayMessage.js";

//Render featured product cards

export function renderFeaturedProducts(products) {
    
    const featuredContainer = document.querySelector(".featured-grid");
    featuredContainer.innerHTML = "";

    for (var i = 0; i < products.length; i++) {
        const product = products[i];

        if (products[i].featured === true) {
            featuredContainer.innerHTML += `<div class="product-card">
                                            <a href="details.html?id=${product.id}" alt="Link to ${product.name} product page" class="product-card-link">
                                                <div class="product-img-container">
                                                    <div class="card-img" style="background-image: url('${product.image_URL}');">
                                                </div>
                                                <div class="product-name-container">
                                                    <h3>${product.name}</h3>
                                                    <p>£${product.price}</p>
                                                </div>
                                            </a>
                                            <div class="cta-button-container">
                                                <a href="details.html?id=${product.id}" class="cta-button"><span>View product</span></a>
                                            </div>
                                        </div>`;
        }

    }
};

//Render all product cards

export function renderAllProducts(products) {
    
    const productContainer = document.querySelector(".product-grid");
    productContainer.innerHTML = "";

    if (products.length === 0) {
        displayMessage("", EMPTY_RESULTS, ".product-grid");
    }

    for (var i = 0; i < products.length; i++) {
        const product = products[i];
        productContainer.innerHTML += `<div class="product-card">
                                            <a href="details.html?id=${product.id}" class="product-card-link">
                                                <div class="product-img-container">
                                                    <div class="card-img" style="background-image: url('${product.image_URL}');">
                                                </div>
                                                <div class="product-name-container">
                                                    <h3>${product.name}</h3>
                                                    <p>£${product.price}</p>
                                                </div>
                                            </a>
                                            <div class="cta-button-container">
                                                <a href="details.html?id=${product.id}" class="cta-button"><span>View product</span></a>
                                            </div>
                                        </div>`

    }

};