import { productsUrl } from "../../data/URLs.js";
import { getExistingCartProducts, getExistingFavouriteProducts, getToken, saveToCart, saveToFavouriteProducts } from "../../utils/storage.js";

export default function deleteProductButton(id) {
    const container = document.querySelector(".delete-container");

    container.innerHTML = `<button type="button" id="delete" class="formButton delete"><span>Delete product</span></button>`;

    const deleteButton = document.querySelector("#delete");

    deleteButton.onclick = function() {
        const modal = document.querySelector(".modal");
        const modalHeader = document.querySelector(".modal-header");
        const modalMessage = document.querySelector(".modal-message");

        modal.style.display = "block";
        modalHeader.innerHTML = `<i class="fas fa-bone"></i>`;
        modalMessage.innerHTML = `<p>Are you sure you want to delete this product?</p>`

        const confirmButton = document.getElementById("confirmButton");
        const cancelButton = document.getElementById("cancelButton");

        confirmButton.onclick = async function() {
            
            const url = productsUrl + id;

            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();
                location.href = "/";
                console.log(json);

                const queryString = document.location.search;
                const params = new URLSearchParams(queryString);
                const productId = params.get("id");
                //remove from favourites page if product is favourited
                const currentFavourites = getExistingFavouriteProducts();
                const productExistsInFavs = currentFavourites.find(function(product) {
                    return product.id === productId;
                });
                if (productExistsInFavs) {
                    const newFavourites = currentFavourites.filter(product => product.id !== productId);
                    saveToFavouriteProducts(newFavourites);
                }

                //remove from cart if product exists in cart
                const currentCart = getExistingCartProducts();
                const productExistsInCart = currentCart.find(function(product) {
                    return product.id === productId;
                });
                if (productExistsInCart) {
                    const newCart = currentCart.filter(product => product.id !== productId);
                    saveToCart(newCart);
                }

            } 
            catch (error) {
                console.log(error);
            }
        }
        cancelButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

}