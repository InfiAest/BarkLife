import { validatePrice, checkLength } from "./smallerValidations.js";
import { updateProduct } from "../update/updateProduct.js";

export default function validateEditProductForm(event) {
    event.preventDefault();

    const nameInput = document.querySelector("#name");
    const nameError = document.querySelector("#product-name-error");
    const imageInput = document.querySelector("#image");
    const descriptionInput = document.querySelector("#description");
    const descriptionError = document.querySelector("#product-description-error");
    const priceInput = document.querySelector("#price");
    const priceError = document.querySelector("#product-price-error");
    const featuredCheckbox = document.querySelector(".featured-checkbox");
    const idInput = document.querySelector("#id");

    const nameValue = nameInput.value.trim();
    const imageValue = imageInput.files[0];
    const descriptionValue = descriptionInput.value.trim();
    const priceValue = priceInput.value.trim();
    const featuredValue = featuredCheckbox.checked;
    const idValue = idInput.value;

    var formIsValid = true;

    if (checkLength(nameInput.value, 3) === true) {
        nameError.style.display = "none";
        nameInput.style.borderColor = "#698678";
    } else {
        nameError.style.display = "block";
        nameInput.style.borderColor = "#ac6b63";
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
        updateProduct(nameValue, imageValue, descriptionValue, priceValue, featuredValue, idValue);
    };
};
