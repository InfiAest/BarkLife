import renderAllProducts from "../renderHtml/renderAllProducts.js";

export function searchProducts(products) {
    const searchBar = document.querySelector(".search");
    const searchMessage = document.querySelector(".search-message");

    searchBar.oninput = function(event) {
        const searchValue = event.target.value.trim().toLowerCase();
        searchMessage.style.display = "block";
        searchMessage.innerHTML = `<h3>Products that contain "${searchValue}" in the name or description ...</h3>`;

        if (!searchValue) {
            searchMessage.style.display = "none";
        };

        const filteredProducts = products.filter(function (product) {
            if (product.name.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue)) {
                return true;
            };
        });
        renderAllProducts(filteredProducts);
    };
};