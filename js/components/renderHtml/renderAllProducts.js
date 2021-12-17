import { EMPTY_RESULTS } from "../../settings/messages.js";
import displayMessage from "../renderMessage/displayMessage.js";
import { getExistingFavouriteProducts, getToken } from "../../utils/storage.js";
import { addProductToFavourites } from "../buttons/addToFavourites.js";

//Render all product cards
export default function renderAllProducts(products) {
    
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = "";

    if (products.length === 0) {
        displayMessage("empty", EMPTY_RESULTS, ".product-grid");
    };

    products.forEach(function(product) {

        const token = getToken();

        if (token) {
            var productButtons = `<a href="edit.html?id=${product.id}" class="cta-button delete"><span>Edit product</span></a>
                                    <a href="details.html?id=${product.id}" class="cta-button viewButton"><span>View Product</span></a>`;
        } else if(!token) {
            var productButtons = `<a href="details.html?id=${product.id}" class="cta-button viewButton"><span>View Product</span></a>`;
        };

        let cssClass = "far";

        const favourites = getExistingFavouriteProducts();

        const isProductFavourited = favourites.find(function(favourite) {
            return parseInt(favourite.id) === product.id;
        });

        if(isProductFavourited) {
            cssClass = "fas";
        };
        
        productGrid.innerHTML += `<div class="product-card">
                                            <div class="icon-container">
                                                <i class="${cssClass} fa-heart favButton" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image.url}" aria-label="add/remove product from favourites"></i>
                                            </div>
                                            <a href="details.html?id=${product.id}" alt="Link to ${product.name} product page" class="product-card-link">
                                                <div class="product-img-container">
                                                    <div class="card-img" style="background-image: url('${product.image.url}');"></div>
                                                </div>
                                                <div class="product-name-container">
                                                    <h3>${product.name}</h3>
                                                    <p>£${product.price}</p>
                                                </div>
                                            </a>
                                            <div class="card-button-container">
                                                ${productButtons}
                                            </div>
                                        </div>`;
    });
    addProductToFavourites();
};