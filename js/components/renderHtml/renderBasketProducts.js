import { getExistingBasketProducts } from "../../utils/storage.js";
import { EMPTY_RESULTS } from "../../settings/messages.js";
import displayMessage from "../renderMessage/displayMessage.js";
import deleteProductInBasket from "../buttons/deleteProductInBasket.js"
import { plusProduct, minusProduct } from "../buttons/adjustQuantityInCart.js";

export default function renderBasketProducts() {
    const products = getExistingBasketProducts();

    const basketProducts = document.querySelector(".basket-products");
    const totalPrice = document.querySelector(".total-price");
    
    basketProducts.innerHTML = "";
    let sum = 0.00;

    if(products.length === 0) {
        displayMessage("empty", EMPTY_RESULTS, ".basket-products");
        totalPrice.innerHTML = `£0.00`;
    };
    
    products.forEach(product => {

        let productPrice = parseFloat(product.price).toFixed(2) * product.quantity;
        const totalProductPrice = productPrice.toFixed(2);
        sum += productPrice;
        const totalSum = sum.toFixed(2);
    
        basketProducts.innerHTML += `<a href="details.html?id=${product.id}" alt="Link to ${product.name} product page" class="product-card-link">
                                        <div class="basket-product">    
                                            <div class="basket-img-container">
                                                <div class="basket-img" style="background-image: url('${product.image}');"></div>
                                            </div>
                                            <div class="basket-info-container">
                                                <div class="basket-product-name">
                                                    <h3>${product.name}</h3>
                                                    </a>
                                                <i class="far fa-trash-alt trashButton" data-id="${product.id}"></i>
                                                </div>
                                                <div class="price-quantity-container">
                                                    <div class="quantity-container">
                                                        <button class="minus" data-id="${product.id}">-</button>
                                                        <p>${product.quantity} item(s)</p>
                                                        <button class="plus" data-id="${product.id}">+</button>
                                                    </div>
                                                    <div class="basket-price-container">
                                                        <p>£${totalProductPrice}</p>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>`
    
        totalPrice.innerHTML = `£${totalSum}`;
    });
    deleteProductInBasket();

    const minusButtons = document.querySelectorAll(".minus");
    minusButtons.forEach((button) => {
        button.addEventListener("click", minusProduct);
    });
    const plusButtons = document.querySelectorAll(".plus");
    plusButtons.forEach((button) => {
        button.addEventListener("click", plusProduct);
    });
};


