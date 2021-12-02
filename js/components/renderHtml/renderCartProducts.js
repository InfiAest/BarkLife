import { getExistingCartProducts, saveToCart } from "../../utils/storage.js";
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

        let productPrice = parseFloat(product.price).toFixed(2) * product.quantity;
        const totalProductPrice = productPrice.toFixed(2);
        sum += productPrice;
        const totalSum = sum.toFixed(2);
    
        basketProducts.innerHTML += `<a href="details.html?id=${product.id}" alt="Link to ${product.name} product page" class="product-card-link">
                                        <div class="cart-product">    
                                            <div class="cart-img-container">
                                                <div class="cart-img" style="background-image: url('${product.image}');"></div>
                                            </div>
                                            <div class="cart-info-container">
                                                <div class="cart-product-name">
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
                                                    <div class="price-container">
                                                        <p>£${totalProductPrice}</p>
                                                    </div>
                                                </div>
                                            </div>    
                                        </div>`
    
        totalPrice.innerHTML = `£${totalSum}`;
    });
    
    deleteProductInCart();


    const minusButtons = document.querySelectorAll(".minus");
    minusButtons.forEach((button) => {
        button.addEventListener("click", minusProduct);
    });
    const plusButtons = document.querySelectorAll(".plus");
    plusButtons.forEach((button) => {
        button.addEventListener("click", plusProduct);
    });

}



function minusProduct() {
    const id = this.dataset.id;

    const currentCart = getExistingCartProducts();

        const doesProductExist = currentCart.find(function(product) {
            return product.id === id;
        });

    if(doesProductExist && doesProductExist.quantity > 1) {
            const thatProduct = currentCart.find(function(product) {
                return product.id === id;
            });
            thatProduct.quantity --;
            saveToCart(currentCart);
    } 
    else if(doesProductExist.quantity === 1) {
        console.log("delete product");
        const newCartList = currentCart.filter(doesProductExist => doesProductExist.id !== id);
        saveToCart(newCartList);
        renderCartProducts();
        
    }

    renderCartProducts();
}


function plusProduct() {
    const id = this.dataset.id;

    const currentCart = getExistingCartProducts();

        const doesProductExist = currentCart.find(function(product) {
            return product.id === id;
        });

    if(doesProductExist) {
            const thatProduct = currentCart.find(function(product) {
                return product.id === id;
            });
            thatProduct.quantity ++;
            saveToCart(currentCart);
    }

    renderCartProducts();
}