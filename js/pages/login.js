import completeLogin from "../components/forms/loginFunction/completeLogin.js";
import createNavBar from "../components/menu/createMenu.js";
import { validateEmail, validatePassword } from "../utils/regexValidations.js";

createNavBar();

const form = document.querySelector("form");
const username = document.querySelector("#username");
const usernameError = document.querySelector("#username-error");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#password-error");

form.addEventListener("submit", validateLoginForm);

function validateLoginForm(event) {
    event.preventDefault();

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
    }
    
    if (validatePassword(password.value) === true) {
        passwordError.style.display = "none";
        password.style.borderColor = "#698678";
    } else {
        passwordError.style.display = "block";
        password.style.borderColor = "#ac6b63";
        formIsValid = false;
    }
    
    if(formIsValid === true) {
        console.log("congrats")
        completeLogin(usernameValue, passwordValue);
    }

    
}
