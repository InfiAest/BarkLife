import { getExistingCartProducts, saveToCart } from "../../utils/storage.js";
import renderCartProducts from "../renderHtml/renderCartProducts.js"

export default function deleteProductInCart() {

    const trashButtons = document.querySelectorAll(".trashButton");

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

            const completeDelete = confirm(`Are you sure you want to delete ${productExists.quantity} x ${productExists.name} from your basket?`);

            if(completeDelete) {
                const newCartList = currentCartProducts.filter(product => product.id !== id);
                saveToCart(newCartList);
                renderCartProducts();
            }
        }

    }

}
