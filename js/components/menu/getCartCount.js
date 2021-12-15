import { getExistingCartProducts } from "../../utils/storage.js";

export default function getCartCount() {
    const currentCart = getExistingCartProducts();
    let totalQuanity = 0;

    // console.log(currentCart);
    currentCart.forEach(function(product) {
        // console.log(product.quantity);
        totalQuanity += product.quantity;
        // console.log(totalQuanity);
        const cartCount = document.querySelectorAll(".cartCount");
        cartCount.forEach(span => span.innerHTML = totalQuanity);
        return totalQuanity;
    });
};