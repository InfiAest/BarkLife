import createNavBar from "../components/menu/createMenu.js";
import stickyNav from "../components/menu/stickyNav.js";
import { getToken } from "../utils/storage.js";
import renderImagePreview from "../components/renderHtml/renderImagePreview.js";
import validateNewProductForm from "../components/forms/validation/validateNewProductForm.js";

//if not logged in don't allow access to page
const token = getToken();
if(!token) {
    location.href = "/";
}
//create menu and sticky nav
createNavBar();
window.onscroll = function() {stickyNav()};

//add product form - add image preview and validate the form
renderImagePreview();
const form = document.querySelector("form");
form.addEventListener("submit", validateNewProductForm);



