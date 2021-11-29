import createMenu from "./components/createMenu.js";
import { getExistingCartProducts } from "./utils/storage.js";
import { EMPTY_RESULTS } from "./settings/messages.js";
import displayMessage from "./components/displayMessage.js";

createMenu();

const products = getExistingCartProducts();

const basketProducts = document.querySelector(".basket-products");
const totalPrice = document.querySelector(".total-price");

if(products.length === 0) {
    displayMessage("", EMPTY_RESULTS, ".basket-container");
};

let sum = 0.00;

// for (let i = 0; i < products.length; i++) {
//     // console.log(parseFloat(products[i].price));
//     const prices = parseFloat(products[i].price).toFixed(2);
//     console.log(sum += prices);
// }
// console.log(sum);

products.forEach(product => {
    basketProducts.innerHTML += `<a href="details.html?id=${product.id}" alt="Link to ${product.name} product page" class="product-card-link">
                                    <div class="cart-product">    
                                        <div class="cart-img-container">
                                            <div class="cart-img" style="background-image: url('${product.image}');"></div>
                                        </div>
                                        <div class="cart-name-container">
                                            <h3>${product.name}</h3>
                                            <p>£${product.price}</p>
                                        </div>    
                                    </div>
                                </a>`

    totalPrice.innerHTML = `£${sum}`;
});



