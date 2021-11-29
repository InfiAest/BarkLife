import { getExistingCartProducts, saveToCart } from "../utils/storage.js";

export default function renderProductDetails(product) {

    const productContainer = document.querySelector(".product-container");
    const pageTitle = document.querySelector("title");

    pageTitle.innerHTML += `${product.name}`;

    productContainer.innerHTML += `<h1 class="product-name">${product.name}</h1>
                                    <div class="img-container">
                                        <div class="product-image" style="background-image: url('${product.image_URL}');"></div>
                                    </div>
                                    <div class="description-price-container">
                                        <div class="description-container">
                                            <h2 class="description-header">Product Description:</h2>
                                            <p>${product.description}</p>
                                        </div>
                                        <div class="price-container">
                                            <p>£${product.price}</p>
                                        </div>
                                    </div>
                                    <div class="cta-button-container">
                                        <button type="button" class="add-to-cart-button cta-button" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image_URL}">
                                            <span>Add to cart</span>
                                        </button>
                                    </div>`


    const addButton = document.querySelector(".add-to-cart-button");

    addButton.addEventListener("click", toggleCartItem);

    function toggleCartItem() {

        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = this.dataset.price;
        const image = this.dataset.image;

        const currentCart = getExistingCartProducts();

        const productExists = currentCart.find(function(product) {
            return product.id === id;
        });

        if(!productExists) {
            const product = { id: id, name: name, price: price, image: image };
            currentCart.push(product);
            saveToCart(currentCart);
        }
        else {
            const newCart = currentCart.filter(product => product.id !== id);
            saveToCart(newCart);
        }

    };
};

