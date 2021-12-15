import createNavBar from "../components/menu/createMenu.js";
import stickyNav from "../components/menu/stickyNav.js";
import { getToken } from "../utils/storage.js";
import validateEditProductForm from "../components/forms/validation/validateEditProductForm.js";
import loaderAnimation from "../components/loader/loaderAnimation.js";
import getDetailsEditForm from "../components/fetch/getDetailsEditForm.js";

//if not logged in don't allow access to page
const token = getToken();
if (!token) {
    location.href = "/";
}

//pageloader
window.onload = loaderAnimation();

//create menu and sticky nav
createNavBar();
window.onscroll = function() {stickyNav()};

//edit product form - get details for form and validate the form
const form = document.querySelector(".edit-product-form");
getDetailsEditForm();
form.addEventListener("submit", validateEditProductForm);


