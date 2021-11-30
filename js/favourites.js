import createNavBar from "./components/createMenu.js";
import { getExistingFavouriteProducts, getToken } from "./utils/storage.js";
import displayMessage from "./components/displayMessage.js";
import { EMPTY_RESULTS } from "./settings/messages.js";
import { addProductToFavourites } from "./components/addToFavourites.js";

createNavBar();


const token = getToken();

if (token) {
    var productLink = "edit.html?id=";
    var buttonLabel = "Edit product";
}
else if(!token) {
    var productLink = "details.html?id=";
    var buttonLabel = "View product";
}


const favourites = getExistingFavouriteProducts();

const favouritesGrid = document.querySelector(".favourites-grid");

if (favourites.length === 0) {
    displayMessage("", EMPTY_RESULTS, ".favourites-grid");
}

favourites.forEach(favourite => {

    favouritesGrid.innerHTML += `<div class="product-card">
                                    <i class="fas fa-heart favButton" data-id="${favourite.id}" data-name="${favourite.name}" data-price="${favourite.price}" data-image="${favourite.image}"></i>
                                    <a href="${productLink}${favourite.id}" alt="Link to ${favourite.name} product page" class="product-card-link">
                                        <div class="product-img-container">
                                            <div class="card-img" style="background-image: url('${favourite.image}');"></div>
                                        </div>
                                        <div class="product-name-container">
                                            <h3>${favourite.name}</h3>
                                            <p>£${favourite.price}</p>
                                        </div>
                                    </a>
                                    <div class="cta-button-container">
                                        <a href="${productLink}${favourite.id}" class="cta-button"><span>${buttonLabel}</span></a>
                                    </div>
                                </div>`
});

addProductToFavourites();