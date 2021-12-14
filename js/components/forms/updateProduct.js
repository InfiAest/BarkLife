import displayMessage from "../renderMessage/displayMessage.js";
import previewProductImg from "../renderHtml/renderImagePreview.js";
import { saveToFavouriteProducts, getExistingFavouriteProducts, getExistingCartProducts, saveToCart, getToken } from "../../utils/storage.js";
import { baseUrl } from "../../data/URLs.js";


export async function updateProduct(name, imgValue, description, price, featured, id) {

    const nameInput = document.querySelector("#name");
    const imageUrlInput = document.querySelector("#image");
    const descriptionInput = document.querySelector("#description");
    const priceInput = document.querySelector("#price");
    
    const token = getToken();

    const url = baseUrl + "products/" + id;
    const data = JSON.stringify({ name: name, image_URL: imgValue, description: description, price: price, featured: featured });

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.updated_at) {
            console.log(json)
            displayMessage("success", "Product updated", ".message-container");
            previewProductImg();
            nameInput.style.borderColor = "#ded6d3";
            imageUrlInput.style.borderColor = "#ded6d3";
            descriptionInput.style.borderColor = "#ded6d3";
            priceInput.style.borderColor = "#ded6d3";

            //update product if it's in the favourites
            const currentFavourites = getExistingFavouriteProducts();
                const productExistsInFavs = currentFavourites.find(function(product) {
                    return product.id === id;
                });

            if (productExistsInFavs) {
                const updatedFavouriteProducts = currentFavourites.filter(product => product.id !== id);
                saveToFavouriteProducts(updatedFavouriteProducts);

                const updatedProduct = { id: id, name: name, image: imgValue, description: description, price: price, featured: featured };
                const newFavouriteProducts = getExistingFavouriteProducts();
                newFavouriteProducts.push(updatedProduct);
                saveToFavouriteProducts(newFavouriteProducts);
            }

            //update product if it's in the cart
            const currentCartProducts = getExistingCartProducts();
            const productExistsInCart = currentCartProducts.find(function(product) {
                return product.id === id;
            });

            if (productExistsInCart) {
                //get quantity of that item in the cart
                const quantityInCart = productExistsInCart.quantity;
                const updatedCartProducts = currentCartProducts.filter(product => product.id !== id);
                saveToCart(updatedCartProducts);

                const updatedProduct = { id: id, name: name, image: imgValue, description: description, price: price, featured: featured, quantity: quantityInCart }
                const newCartProducts = getExistingCartProducts();
                newCartProducts.push(updatedProduct);
                saveToCart(newCartProducts);
            }
        }
        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    }
    catch(error) {
        console.log(error);
    }
}