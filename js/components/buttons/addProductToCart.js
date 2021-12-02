import { getExistingCartProducts, saveToCart } from "../../utils/storage.js";

export default function addProductToCart() {
    const addButton = document.querySelector(".add-to-cart-button");

    addButton.addEventListener("click", addToCart);

    function addToCart() {

        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = this.dataset.price;
        const image = this.dataset.image;
        let itemCount = 1;

        const currentCart = getExistingCartProducts();

        const doesProductExist = currentCart.find(function(product) {
            return product.id === id;
        });

        //If product is already in the cart then up the quantity of that product instead
        if(doesProductExist) {
            const thatProduct = currentCart.find(function(product) {
                return product.id === id;
            });
            thatProduct.quantity ++;
            saveToCart(currentCart);
        } else {
            const product = { id: id, name: name, price: price, image: image, quantity: itemCount };
            currentCart.push(product);
            saveToCart(currentCart);
        }


    };
}