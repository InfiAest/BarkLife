import { getExistingFavouriteProducts, saveToFavouriteProducts } from "../../utils/storage.js";
import renderFavouriteProducts from "../renderHtml/renderFavourites.js";

export default function removeFromFavourites() {
    const favButtons = document.querySelectorAll(".favButton");

    favButtons.forEach((button) => {
        button.addEventListener("click", removeFavourite);
    });

    function removeFavourite() {
        this.classList.toggle("far");
        this.classList.toggle("fas");

        const id = this.dataset.id;

        const currentFavourites = getExistingFavouriteProducts();

        const productExists = currentFavourites.find(function(product) {
            return product.id === id;
        });

        if(productExists) {
            const newFavourites = currentFavourites.filter(product => product.id !== id);
            saveToFavouriteProducts(newFavourites);
            renderFavouriteProducts();
        }
        
    };
    
};
