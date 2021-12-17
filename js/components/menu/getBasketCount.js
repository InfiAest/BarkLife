import { getExistingBasketProducts } from "../../utils/storage.js";

export default function getBasketCount() {
    const currentBasket = getExistingBasketProducts();
    const basketCount = document.querySelectorAll(".basketCount");
    let totalQuanity = 0;

    if (currentBasket.length === 0) {
        totalQuanity = 0;
        basketCount.forEach(span => span.style.display = "none");
    }

    currentBasket.forEach(function(product) {
        totalQuanity += product.quantity;
        
        if (totalQuanity > 0) {
            basketCount.forEach(span => span.style.display = "initial");
        }
        basketCount.forEach(span => span.innerHTML = totalQuanity);
    });
};
