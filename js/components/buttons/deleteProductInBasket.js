import { getExistingBasketProducts, saveToBasket } from "../../utils/storage.js";
import renderBasketProducts from "../renderHtml/renderBasketProducts.js";

export default function deleteProductInBasket() {

    const trashButtons = document.querySelectorAll(".trashButton");
    const modal = document.querySelector(".modal");
    const modalHeader = document.querySelector(".modal-header");
    const modalMessage = document.querySelector(".modal-message");

    trashButtons.forEach((button) => {
        button.addEventListener("click", removeBasketProduct);
    });

    function removeBasketProduct() {
        const id = this.dataset.id;
        const currentBasketProducts = getExistingBasketProducts();
        const productExists = currentBasketProducts.find(function(product) {
            return product.id === id;
        });
        
        if(productExists) {

            modal.style.display = "block";
            modalHeader.innerHTML = `<i class="fas fa-shopping-bag"></i>`;
            modalMessage.innerHTML = `<p>Are you sure you want to delete ${productExists.quantity} x ${productExists.name} from your basket?</p>`;
            
            const confirmButton = document.getElementById("confirmButton");
            const cancelButton = document.getElementById("cancelButton");

            confirmButton.addEventListener("click", () => {
                modal.style.display = "none";
                const newBasketList = currentBasketProducts.filter(product => product.id !== id);
                saveToBasket(newBasketList);
                renderBasketProducts();
            });

            cancelButton.addEventListener("click", () => {
                modal.style.display = "none";
            });
        };
    };
};
