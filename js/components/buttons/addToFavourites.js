import { getExistingFavouriteProducts, saveToFavouriteProducts } from "../../utils/storage.js";
import renderAllProducts from "../renderHtml/renderAllProducts.js";

export function addProductToFavourites() {
    const favButtons = document.querySelectorAll(".favButton");

    favButtons.forEach((button) => {
        button.addEventListener("click", toggleFavourite);
    });

    function toggleFavourite() {
        this.classList.toggle("far");
        this.classList.toggle("fas");

        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = this.dataset.price;
        const image = this.dataset.image;

        const currentFavourites = getExistingFavouriteProducts();

        const productExists = currentFavourites.find(function(product) {
            return product.id === id;
        });

        if(!productExists) {
            const product = { id: id, name: name, price: price, image: image };
            currentFavourites.push(product);
            saveToFavouriteProducts(currentFavourites);
        }
        else {
            const newFavourites = currentFavourites.filter(product => product.id !== id);
            saveToFavouriteProducts(newFavourites);
        }
    };
};