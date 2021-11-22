import { renderAllProducts } from "./renderProductCards.js";

export function searchProducts(products) {
    const searchBar = document.querySelector(".search");

    searchBar.onkeyup = function(event) {
        const searchValue = event.target.value.trim().toLowerCase();

        const filteredProducts = products.filter(function (product) {
            if (product.name.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue)) {
                return true;
            }
        });

        renderAllProducts(filteredProducts);

    };
};