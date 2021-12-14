import { validateURL, validatePrice, checkLength } from "./smallerValidations.js";
import { updateProduct } from "../update/updateProduct.js";
import previewProductImg from "../../renderHtml/renderImagePreview.js";


export default function validateEditProductForm(event) {
    event.preventDefault();

    const nameInput = document.querySelector("#name");
    const nameError = document.querySelector("#product-name-error");
    const imageUrlInput = document.querySelector("#image");
    const imageError = document.querySelector("#product-image-error");
    const imagePreview = document.querySelector(".preview-img-container");
    const descriptionInput = document.querySelector("#description");
    const descriptionError = document.querySelector("#product-description-error");
    const priceInput = document.querySelector("#price");
    const priceError = document.querySelector("#product-price-error");
    const featuredCheckbox = document.querySelector(".featured-checkbox");
    const idInput = document.querySelector("#id");

    const nameValue = nameInput.value.trim();
    const imgValue = imageUrlInput.value.trim();
    const descriptionValue = descriptionInput.value.trim();
    const priceValue = priceInput.value.trim();
    const featuredValue = featuredCheckbox.checked;
    const idValue = idInput.value;

    previewProductImg();

    var formIsValid = true;

    if (checkLength(nameInput.value, 3) === true) {
        nameError.style.display = "none";
        nameInput.style.borderColor = "#698678";
    } else {
        nameError.style.display = "block";
        nameInput.style.borderColor = "#ac6b63";
        formIsValid = false;
    };

    if (validateURL(imageUrlInput.value) === true) {
        imageError.style.display = "none";
        imageUrlInput.style.borderColor = "#698678";
        imagePreview.innerHTML = `<div class="preview-image" style="background-image: url('${imgValue}')"></div>`;
    } else {
        imageError.style.display = "block";
        imageUrlInput.style.borderColor = "#ac6b63";
        formIsValid = false;
    };

    if (checkLength(descriptionInput.value, 19) === true) {
        descriptionError.style.display = "none";
        descriptionInput.style.borderColor = "#698678";
    } else {
        descriptionError.style.display = "block";
        descriptionInput.style.borderColor = "#ac6b63";
        formIsValid = false;
    };

    if (validatePrice(priceInput.value)) {
        priceError.style.display = "none";
        priceInput.style.borderColor = "#698678";
    } else {
        priceError.style.display = "block";
        priceInput.style.borderColor = "#ac6b63";
        formIsValid = false;
    };

    if (formIsValid === true) {
        updateProduct(nameValue, imgValue, descriptionValue, priceValue, featuredValue, idValue);
    };
};
