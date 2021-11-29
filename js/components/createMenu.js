import { getUsername } from "../utils/storage.js";
import logout from "./logout.js";

export default function createNavBar() {
    const { pathname } = document.location;

    const menuContainer = document.querySelector(".navigation");
    // const userNavContainer = document.querySelector(".user-navigation");

    const username = getUsername();

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login<i class="fas fa-user"></i></a>`;

    if (username) {
        authLink = `<li><a href="/add.html" class="${pathname === "/add.html" ? "active" : ""}">Add Product<i class="fas fa-plus"></i></a></li>
                    <button id="logout">Logout ${username}<i class="fas fa-user"></i></button>`;
    }

    menuContainer.innerHTML = ` <li><a href="/" class="${pathname === "/" || pathname === "/index.html" ? "current" : ""}">Home</a></li>
                                <li><a href="/products.html" class="${pathname === "/products.html" ? "current" : ""}">Products</a></li>
                                <li><a href="/basket.html" class="${pathname === "/basket.html" ? "current" : ""}">Basket<i class="fas fa-shopping-bag"></i></a></li>
                                <li>${authLink}</li>`;

    

    logout();
}