import { getExistingFavouriteProducts, getToken } from "../../utils/storage.js";
import displayMessage from "../renderMessage/displayMessage.js";
import { EMPTY_RESULTS } from "../../settings/messages.js";
import removeFromFavourites from  "../buttons/removeProductFromFavourites.js";

export default function renderFavouriteProducts() {

    const favourites = getExistingFavouriteProducts();

    const favouritesGrid = document.querySelector(".favourites-grid");

    favouritesGrid.innerHTML = "";

    if (favourites.length === 0) {
        favouritesGrid.style.gridTemplateColumns = "1fr";
        displayMessage("empty", EMPTY_RESULTS, ".favourites-grid");
    }

    favourites.forEach(favourite => {

        const token = getToken();

        if (token) {
            var productButtons = `<a href="edit.html?id=${favourite.id}" class="cta-button delete"><span>Edit product</span></a>
                                    <a href="details.html?id=${favourite.id}" class="cta-button viewButton"><span>View Product</span></a>`;
        }
        else if(!token) {
            var productButtons = `<a href="details.html?id=${favourite.id}" class="cta-button viewButton"><span>View Product</span></a>`;
        }

        favouritesGrid.innerHTML += `<div class="product-card">
                                        <div class="icon-container">
                                            <i class="fas fa-heart favButton" data-id="${favourite.id}"></i>
                                        </div>
                                        <a href="details.html?id=${favourite.id}" alt="Link to ${favourite.name} product page" class="product-card-link">
                                            <div class="product-img-container">
                                                <div class="card-img" style="background-image: url('${favourite.image}');"></div>
                                            </div>
                                            <div class="product-name-container">
                                                <h3>${favourite.name}</h3>
                                                <p>£${favourite.price}</p>
                                            </div>
                                        </a>
                                        <div class="card-button-container">
                                            ${productButtons}
                                        </div>
                                    </div>`
    });

    removeFromFavourites();
}