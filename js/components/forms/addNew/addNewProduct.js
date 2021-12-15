import displayMessage from "../../renderMessage/displayMessage.js";
import { productsUrl } from "../../../data/URLs.js";
import { getToken } from "../../../utils/storage.js";
import getStrapiSettings from "../../../utils/strapiSettings.js";

export async function addNewProduct(nameValue, imageValue, descriptionValue, priceValue, featuredValue) {
    const form = document.querySelector("form");
    const name = document.querySelector("#name");
    const image = document.querySelector("#image");
    const description = document.querySelector("#description");
    const price = document.querySelector("#price");

    const token = getToken();

    const data = JSON.stringify({ name: nameValue, description: descriptionValue, price: priceValue, featured: featuredValue });
    
    //create and append the form data to allow the image to be uploaded to strapi when submitting form
    const formData = new FormData();
    formData.append("files.image", imageValue, imageValue.name);
    formData.append("data", data);

    const method = "POST";
    const headers = { Authorization: "Bearer " + token };

    //get strapi settings and use the above (data, method and headers) as the options when fetching the api
    const options = getStrapiSettings(formData, method, headers);

    try {
        const response = await fetch(productsUrl, options);
        const json = await response.json();

        if(json.created_at) {
            displayMessage("success", "Product created", ".message-container");
            form.reset();
            name.style.borderColor = "#ded6d3";
            image.style.borderColor = "#ded6d3";
            description.style.borderColor = "#ded6d3";
            price.style.borderColor = "#ded6d3";
        };
        if(json.error) {
            displayMessage("error", json.messageContainer, ".message-container");
        };
        console.log(json);
    } catch(error) {
        console.log(error);
    };
};