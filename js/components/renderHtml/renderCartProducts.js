import { getExistingCartProducts } from "../../utils/storage.js";
import { EMPTY_RESULTS } from "../../settings/messages.js";
import displayMessage from "../renderMessage/displayMessage.js";
import deleteProductInCart from "../buttons/deleteProductInCart.js"

export default function renderCartProducts() {
    const products = getExistingCartProducts();

    const basketProducts = document.querySelector(".basket-products");
    const totalPrice = document.querySelector(".total-price");
    
    basketProducts.innerHTML = "";
    let sum = 0.00;

    if(products.length === 0) {
        displayMessage("", EMPTY_RESULTS, ".basket-container");
        totalPrice.innerHTML = `£0.00`;
    };
    
    
    products.forEach(product => {
        
        sum += parseFloat(product.price);
    
        basketProducts.innerHTML += `<a href="details.html?id=${product.id}" alt="Link to ${product.name} product page" class="product-card-link">
                                        <div class="cart-product">    
                                            <div class="cart-img-container">
                                                <div class="cart-img" style="background-image: url('${product.image}');"></div>
                                            </div>
                                            <div class="cart-name-container">
                                                <h3>${product.name}</h3>
                                                </a>
                                                <div class="price-container">
                                                    <p>1 item(s)</p>
                                                    <p>£${product.price}</p>
                                                    <i class="far fa-trash-alt trashButton" data-id="${product.id}"></i>
                                                </div>
                                            </div>    
                                        </div>`
    
        totalPrice.innerHTML = `£${sum}`;
    });
    
    deleteProductInCart();
}

