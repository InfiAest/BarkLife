import displayMessage from "../../renderMessage/displayMessage.js";
import previewProductImg from "../../renderHtml/renderImagePreview.js";
import { saveToFavouriteProducts, getExistingFavouriteProducts, getExistingBasketProducts, saveToBasket, getToken } from "../../../utils/storage.js";
import { baseUrl } from "../../../data/URLs.js";
import getStrapiSettings from "../../../utils/strapiSettings.js";

export async function updateProduct(name, image, description, price, featured, id) {

    const nameInput = document.querySelector("#name");
    const imageInput = document.querySelector("#image");
    const descriptionInput = document.querySelector("#description");
    const priceInput = document.querySelector("#price");
    const imageValue = image;
    const imageError = document.querySelector("#product-image-error");
    
    const token = getToken();
    const url = baseUrl + "products/" + id;

    //data and headers should be let variables so that it can be changed if an image is uploaded
    let data = JSON.stringify({ name: name, description: description, price: price, featured: featured });
    const method = "PUT";
    let headers = { "Content-Type": "application/json", "Authorization": "Bearer " + token };

    //check that the image file is maximum 200mb and the correct file type
    const imageWrong = imageInput.files.length === 0|| imageValue.size > 200000000 || imageValue.type !== "image/jpeg" && imageValue.type !== "image/jpg" && imageValue.type !== "image/png";
    //if there is an image selected
    if (imageInput.files.length > 0) {
        //check that the image chosen is correct
        if (!imageWrong) {
            //then create and append the form data to allow the image to be uploaded to strapi when submitting form
            const formData = new FormData();
            formData.append("files.image", imageValue, imageValue);
            formData.append("data", data);
            data = formData;
            headers = { "Authorization": "Bearer " + token };
            imageInput.style.borderColor = "#698678";
            imageError.style.display = "none";
        } else {
            //if new image is selected and it's wrong file type/size etc then display image error
            imageInput.style.borderColour = "#ac6b63";
            imageError.style.display = "block";
            return;
        };
    };

    //get those strapi settings and use the above (data, method and headers) as the options when fetching the api
    const options = getStrapiSettings(data, method, headers);

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        console.log(json.image.url);

        if (json.updated_at) {
            console.log(json)
            displayMessage("success", "Product updated", ".message-container");
            previewProductImg(json);
            nameInput.style.borderColor = "#ded6d3";
            imageInput.style.borderColor = "#ded6d3";
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

                const updatedProduct = { id: id, name: name, price: price, image: json.image.url };
                const newFavouriteProducts = getExistingFavouriteProducts();
                newFavouriteProducts.push(updatedProduct);
                saveToFavouriteProducts(newFavouriteProducts);
            };

            //update product if it's in the basket
            const currentBasketProducts = getExistingBasketProducts();
            const productExistsInBasket = currentBasketProducts.find(function(product) {
                return product.id === id;
            });

            if (productExistsInBasket) {
                //get quantity of that item in the basket
                const quantityInBasket = productExistsInBasket.quantity;
                const updatedBasketProducts = currentBasketProducts.filter(product => product.id !== id);
                saveToBasket(updatedBasketProducts);

                const updatedProduct = { id: id, name: name, image: json.image.url, description: description, price: price, featured: featured, quantity: quantityInBasket }
                const newBasketProducts = getExistingBasketProducts();
                newBasketProducts.push(updatedProduct);
                saveToBasket(newBasketProducts);
            };
        }
        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        };
    } catch(error) {
        console.log(error);
    };
};

