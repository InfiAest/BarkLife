import { getExistingCartProducts, saveToCart } from "../../utils/storage.js";

const addedModal = document.querySelector(".added-modal");
var span = document.getElementsByClassName("close")[0];

export default function addProductToCart() {
    const addButton = document.querySelector(".add-to-cart-button");

    addButton.addEventListener("click", addToCart);

    function addToCart() {
        const modalMessage = document.querySelector(".modal-message");

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
            addedModal.style.display = "block";
            modalMessage.innerHTML = `<p>1 x ${doesProductExist.name} added to cart. There is now ${thatProduct.quantity} in the cart.</p>`;
        } else {
            const product = { id: id, name: name, price: price, image: image, quantity: itemCount };
            currentCart.push(product);
            saveToCart(currentCart);
            addedModal.style.display = "block";
            modalMessage.innerHTML = `<p>1 x ${product.name} added to cart</p>`;
        }


    };
}

window.onclick = function(event) {
    if (event.target == addedModal) {
        addedModal.style.display = "none";
    }
  }

  span.onclick = function() {
    addedModal.style.display = "none";
  }
