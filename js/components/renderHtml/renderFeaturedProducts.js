import { EMPTY_RESULTS } from "../../settings/messages.js";
import displayMessage from "../renderMessage/displayMessage.js";
import { getExistingFavouriteProducts, getToken } from "../../utils/storage.js";
import { addProductToFavourites } from "../buttons/addToFavourites.js";

//if logged in as admin go to edit page instead of products details page
const token = getToken();

if (token) {
    var productLink = "edit.html?id=";
    var buttonLabel = "Edit product";
}
else if(!token) {
    var productLink = "details.html?id=";
    var buttonLabel = "View product";
}


//Render featured product cards
export default function renderFeaturedProducts(products) {
    
    const featuredContainer = document.querySelector(".featured-grid");
    featuredContainer.innerHTML = "";

    if (products.length === 0) {
        displayMessage("empty", EMPTY_RESULTS, ".product-grid");
    }

    const favourites = getExistingFavouriteProducts();

        for (var i = 0; i < products.length; i++) {
            const product = products[i];

            let cssClass = "far";
        
            const isProductFavourited = favourites.find(function(favourite) {
                return parseInt(favourite.id) === product.id;
            });

            if(isProductFavourited) {
                cssClass = "fas";
            }  

            if (products[i].featured === true) {  

                featuredContainer.innerHTML += `<div class="product-card">
                                                    <div class="icon-container">
                                                        <i class="${cssClass} fa-heart favButton" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image_URL}"></i>
                                                    </div>
                                                    <a href="${productLink}${product.id}" alt="Link to ${product.name} product page" class="product-card-link">
                                                        <div class="product-img-container">
                                                            <div class="card-img" style="background-image: url('${product.image_URL}');"></div>
                                                        </div>
                                                        <div class="product-name-container">
                                                            <h3>${product.name}</h3>
                                                            <p>£${product.price}</p>
                                                        </div>
                                                    </a>
                                                    <div class="cta-button-container">
                                                        <a href="${productLink}${product.id}" class="cta-button"><span>${buttonLabel}</span></a>
                                                    </div>
                                                </div>`;
            }
        }

    addProductToFavourites();

};