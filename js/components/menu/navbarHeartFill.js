import { getExistingFavouriteProducts } from "../../utils/storage.js";

export default function navbarHeartFill() {
    const storedFavourites = getExistingFavouriteProducts();
    const navHearts = document.querySelectorAll(".navHeart");

    if (storedFavourites.length > 0) {
        navHearts.forEach(heart => heart.classList.add("fa"));
    } else {
        navHearts.forEach(heart => heart.classList.remove("fa"));
    }
}