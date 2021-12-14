import { getToken } from "../utils/storage.js";
import createNavBar from "../components/menu/createMenu.js";
import stickyNav from "../components/menu/stickyNav.js";
import validateLoginForm from "../components/forms/validation/validateLoginForm.js"

//if user logged in don't allow access to page
const token = getToken();
if (token) {
    location.href = "/";
}

//create menu and sticky nav
createNavBar();
window.onscroll = function() {stickyNav()};

//login form - validation
const form = document.querySelector("form");
form.addEventListener("submit", validateLoginForm);


