import { getUsername } from "../../utils/storage.js";
import logout from "../buttons/logout.js";
import getBasketCount from "./getBasketCount.js";
import navbarHeartFill from "./navbarHeartFill.js";

export default function createNavBar() {

    const { pathname } = document.location;

    const menuContainer = document.querySelector(".navigation");
    const extraNavContainer = document.querySelector(".extra-navigation");

    const username = getUsername();

    let authLink = `<li><a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login<i class="fas fa-user" aria-label="login button"></i></a></li>`;
    let extraAuthLink = `<li><a href="login.html" class="${pathname === "/login.html" ? "active" : ""}"><i class="fas fa-user" aria-label="login button"></i></a></li>`;

    if (username) {
        authLink = `<li><a href="/add.html" class="${pathname === "/add.html" ? "active" : ""}">Add Product<i class="fas fa-plus" aria-label="add new product"></i></a></li>
                    <button id="logout" class="logout" aria-label="logout">Logout ${username}<i class="fas fa-user"></i></button>`;

        extraAuthLink = `<li><a href="/add.html" class="${pathname === "/add.html" ? "active" : ""}"><i class="fas fa-plus" aria-label="add new product"></i></a></li>
                        <button id="logout" class="logout" aria-label="logout">Logout ${username}<i class="fas fa-user"></i></button>`;
    };

    menuContainer.innerHTML = ` <li><a href="/" class="${pathname === "/" || pathname === "/index.html" ? "current" : ""}">Home</a></li>
                                <li><a href="/products.html" class="${pathname === "/products.html" ? "current" : ""}">Products</a></li>
                                <li><a href="/about.html" class="${pathname === "/about.html" ? "current" : ""}">About us</a></li>
                                <li><a href="/favourites.html" class="${pathname === "/favourites.html" ? "current" : ""}">Favourites<i class="far fa-heart navHeart" aria-label="favourites"></i></a></li>
                                <li><a href="/basket.html" class="${pathname === "/basket.html" ? "current" : ""}">Basket<i class="fas fa-shopping-bag" aria-label="shopping basket"></i><span class="basketCount">0</span></a></li>
                                ${authLink}`;

    
    extraNavContainer.innerHTML = `<li><a href="/favourites.html" class="${pathname === "/favourites.html" ? "current" : ""}"><i class="far fa-heart navHeart" aria-label="favourites"></i></a></li>
                                    <li><a href="/basket.html" class="${pathname === "/basket.html" ? "current" : ""}"><i class="fas fa-shopping-bag" aria-label="shopping basket"></i><span class="basketCount">0</span></a></li>
                                    ${extraAuthLink}`;


    logout();
    getBasketCount();
    navbarHeartFill();
};