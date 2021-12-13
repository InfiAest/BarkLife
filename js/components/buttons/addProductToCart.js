import { getExistingCartProducts, saveToCart } from "../../utils/storage.js";

const modal = document.querySelector(".modal");
const modalHeader = document.querySelector(".modal-header");
const modalButtonContainer = document.querySelector(".modal-button-container");

modalHeader.innerHTML = `<i class="fas fa-shopping-bag"></i>
                            <span class="close">&times;</span>`;
modalButtonContainer.style.display = "none";

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
            modal.style.display = "block";
            modalMessage.innerHTML = `<p>1 x ${doesProductExist.name} added to cart. There is now ${thatProduct.quantity} in the cart.</p>`;
        } else {
            const product = { id: id, name: name, price: price, image: image, quantity: itemCount };
            currentCart.push(product);
            saveToCart(currentCart);
            modal.style.display = "block";
            modalMessage.innerHTML = `<p>1 x ${product.name} added to cart</p>`;
        }


    };
}
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


  span.onclick = function() {
    modal.style.display = "none";
  }
