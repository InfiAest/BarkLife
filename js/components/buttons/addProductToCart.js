import { getExistingCartProducts, saveToCart } from "../../utils/storage.js";

export default function addProductToCart() {
    const addButton = document.querySelector(".add-to-cart-button");

    addButton.addEventListener("click", addToCart);

    function addToCart() {

        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = this.dataset.price;
        const image = this.dataset.image;

        const currentCart = getExistingCartProducts();

        const product = { id: id, name: name, price: price, image: image };
        currentCart.push(product);
        saveToCart(currentCart);

        // const productExists = currentCart.find(function(product) {
        //     return product.id === id;
        // });

        // if(!productExists) {
        //     const product = { id: id, name: name, price: price, image: image };
        //     currentCart.push(product);
        //     saveToCart(currentCart);
        // }
        // else {
        //     const newCart = currentCart.filter(product => product.id !== id);
        //     saveToCart(newCart);
        // }

    };
}