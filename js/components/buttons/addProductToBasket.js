import { getExistingBasketProducts, saveToBasket } from "../../utils/storage.js";

const modal = document.querySelector(".modal");
const modalHeader = document.querySelector(".modal-header");
const goToBasketButton = document.querySelector("#confirmButton");
const continueShoppingButton = document.querySelector("#cancelButton");

modalHeader.innerHTML = `<i class="fas fa-shopping-bag"></i>
                            <span class="close">&times;</span>`;
goToBasketButton.innerHTML = `<span>Go to basket</span>`;
continueShoppingButton.innerHTML = `<span>Continue shopping</span>`;

var closeModal = document.getElementsByClassName("close")[0];

export default function addProductToBasket() {
    const addButton = document.querySelector(".add-to-basket-button");

    addButton.addEventListener("click", addToBasket);

    function addToBasket() {
        const modalMessage = document.querySelector(".modal-message");

        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = this.dataset.price;
        const image = this.dataset.image;
        let itemCount = 1;

        const currentBasket = getExistingBasketProducts();

        const doesProductExist = currentBasket.find(function(product) {
            return product.id === id;
        });

        //If product is already in the basket then up the quantity of that product instead
        if(doesProductExist) {
            const thatProduct = currentBasket.find(function(product) {
                return product.id === id;
            });
            thatProduct.quantity ++;
            saveToBasket(currentBasket);
            modal.style.display = "block";
            modalMessage.innerHTML = `<p>1 x ${doesProductExist.name} added to basket. There is now ${thatProduct.quantity} in the basket.</p>`;
        } else {
            const product = { id: id, name: name, price: price, image: image, quantity: itemCount };
            currentBasket.push(product);
            saveToBasket(currentBasket);
            modal.style.display = "block";
            modalMessage.innerHTML = `<p>1 x ${product.name} added to basket</p>`;
        };
    };
};

goToBasketButton.onclick = function() {
    location.href = "basket.html";
};
continueShoppingButton.onclick = function() {
    location.href = "products.html";
}

window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    };
});

closeModal.onclick = function() {
    modal.style.display = "none";
};
