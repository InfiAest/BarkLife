import { getExistingFavouriteProducts, getToken } from "../../utils/storage.js";
import { addProductToFavourites } from "../buttons/addToFavourites.js";
import addProductToBasket from "../buttons/addProductToBasket.js";
import imageModalPopup from "../imageModal/imageModal.js";

export default function renderProductDetails(product) {

    const token = getToken();

    var editButton = `<a href="edit.html?id=${product.id}"><i class="fas fa-edit editButton" aria-label="edit ${product.name}"></i></a>`;

    if (!token) {
        editButton = "";
    };

    const productContainer = document.querySelector(".product-container");
    const pageTitle = document.querySelector("title");

    pageTitle.innerHTML += `${product.name}`;
    productContainer.innerHTML = "";

    let cssClass = "far";

    const favourites = getExistingFavouriteProducts();

    const isProductFavourited = favourites.find(function(favourite) {
        return parseInt(favourite.id) === product.id;
    });

    if(isProductFavourited) {
        cssClass = "fas";
    };

    productContainer.innerHTML += `<div class="name-container">
                                        <h1 class="product-name">${product.name}</h1>
                                        ${editButton}
                                    </div>
                                    <div class="img-container">
                                        <div class="icon-container">
                                            <i class="${cssClass} fa-heart favButton" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image.url}" aria-label="add/remove ${product.name} from favourites"></i>
                                        </div>
                                        <div class="product-image" style="background-image: url('${product.image.url}');"></div>
                                    </div>
                                    <div class="description-price-container">
                                        <div class="description-container">
                                            <h2 class="description-header">Product Description:</h2>
                                            <p>${product.description}</p>
                                        </div>
                                        <div class="price-container">
                                            <p>£${product.price}</p>
                                        </div>
                                    </div>
                                    <div class="cta-button-container">
                                        <button type="button" class="add-to-basket-button cta-button" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image.url}" aria-label="add 1 ${product.name} to the basket">
                                            <span>Add to basket</span>
                                        </button>
                                    </div>`;

    addProductToFavourites();
    addProductToBasket();
    imageModalPopup(product);
};

