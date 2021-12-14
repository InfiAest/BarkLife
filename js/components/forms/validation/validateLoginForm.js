import completeLogin from "../login/completeLogin.js";
import { validateEmail, validatePassword } from "./smallerValidations.js";

export default function validateLoginForm(event) {
    event.preventDefault();

    const username = document.querySelector("#username");
    const usernameError = document.querySelector("#username-error");
    const password = document.querySelector("#password");
    const passwordError = document.querySelector("#password-error");

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    var formIsValid = true;

    if (validateEmail(username.value) === true) {
        usernameError.style.display = "none";
        username.style.borderColor = "#698678";
    } else {
        usernameError.style.display = "block";
        username.style.borderColor = "#ac6b63";
        formIsValid = false;
    };
    
    if (validatePassword(password.value) === true) {
        passwordError.style.display = "none";
        password.style.borderColor = "#698678";
    } else {
        passwordError.style.display = "block";
        password.style.borderColor = "#ac6b63";
        formIsValid = false;
    };
    
    if(formIsValid === true) {
        completeLogin(usernameValue, passwordValue);
    }; 
};