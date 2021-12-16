import { getExistingBasketProducts } from "../../utils/storage.js";

export default function getBasketCount() {
    const currentBasket = getExistingBasketProducts();
    let totalQuanity = 0;

    currentBasket.forEach(function(product) {
        totalQuanity += product.quantity;
        const basketCount = document.querySelectorAll(".basketCount");
        if (totalQuanity > 0) {
            basketCount.forEach(span => span.style.display = "initial");
        }
        basketCount.forEach(span => span.innerHTML = totalQuanity);
    });
};
