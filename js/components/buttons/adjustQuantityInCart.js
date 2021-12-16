import { getExistingBasketProducts, saveToBasket } from "../../utils/storage.js";
import getBasketCount from "../menu/getBasketCount.js";
import renderBasketProducts from "../renderHtml/renderBasketProducts.js";

export function minusProduct() {
    const modal = document.querySelector(".modal");
    const modalHeader = document.querySelector(".modal-header");
    const modalMessage = document.querySelector(".modal-message");
    const id = this.dataset.id;

    const currentBasket = getExistingBasketProducts();

        const doesProductExist = currentBasket.find(function(product) {
            return product.id === id;
        });

    if(doesProductExist && doesProductExist.quantity > 1) {
            const thatProduct = currentBasket.find(function(product) {
                return product.id === id;
            });
            thatProduct.quantity --;
            saveToBasket(currentBasket);
            getBasketCount();
    } else if(doesProductExist.quantity === 1) {
        modal.style.display = "block";
        modalHeader.innerHTML = `<i class="fas fa-shopping-bag"></i>`;
        modalMessage.innerHTML = `<p>Are you sure you want to delete this ${doesProductExist.name} from your basket?</p>`;

        const confirmButton = document.getElementById("confirmButton");
        const cancelButton = document.getElementById("cancelButton");

        confirmButton.addEventListener("click", () => {
            modal.style.display = "none";
            const newBasketList = currentBasket.filter(doesProductExist => doesProductExist.id !== id);
            saveToBasket(newBasketList);
            renderBasketProducts();
            // getBasketCount();
            //reload page to reset the basket counter (can't figure out why it won't update it)
            // location.reload();
        });
        
        cancelButton.addEventListener("click", () => {
            modal.style.display = "none";
        });  
    };
    renderBasketProducts();
};

export function plusProduct() {
    const id = this.dataset.id;

    const currentBasket = getExistingBasketProducts();

        const doesProductExist = currentBasket.find(function(product) {
            return product.id === id;
        });

    if(doesProductExist) {
            const thatProduct = currentBasket.find(function(product) {
                return product.id === id;
            });
            thatProduct.quantity ++;
            saveToBasket(currentBasket);
            getBasketCount();
    };
    renderBasketProducts();
};