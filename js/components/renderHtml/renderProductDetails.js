import { getExistingFavouriteProducts } from "../../utils/storage.js";
import { addProductToFavourites } from "../buttons/addToFavourites.js";
import addProductToCart from "../buttons/addProductToCart.js";

export default function renderProductDetails(product) {

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
    }

    productContainer.innerHTML += `<h1 class="product-name">${product.name}</h1>
                                    <div class="img-container">
                                        <i class="${cssClass} fa-heart favButton" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image_URL}"></i>
                                        <div class="product-image" style="background-image: url('${product.image_URL}');"></div>
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
                                        <button type="button" class="add-to-cart-button cta-button" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image_URL}">
                                            <span>Add to cart</span>
                                        </button>
                                    </div>`

    
    addProductToFavourites();

    addProductToCart();
};

