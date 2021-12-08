import { getExistingCartProducts, saveToCart } from "../../utils/storage.js";
import renderCartProducts from "../renderHtml/renderCartProducts.js"


export default function deleteProductInCart() {

    const trashButtons = document.querySelectorAll(".trashButton");
    const modal = document.querySelector(".modal");
    const modalHeader = document.querySelector(".modal-header");
    const modalMessage = document.querySelector(".modal-message");

    trashButtons.forEach((button) => {
        button.addEventListener("click", removeCartProduct);
    });

    function removeCartProduct() {
        const id = this.dataset.id;

        const currentCartProducts = getExistingCartProducts();

        const productExists = currentCartProducts.find(function(product) {
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
                const newCartList = currentCartProducts.filter(product => product.id !== id);
                saveToCart(newCartList);
                renderCartProducts();
            });

            cancelButton.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
    }
}
