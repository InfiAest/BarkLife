const tokenKey = "token";
const userKey = "user";
export const basketKey = "Basket";
export const favouritesKey = "Favourites";

export function getExistingFavouriteProducts() {
    const favourites = localStorage.getItem(favouritesKey);

    if(!favourites) {
        return [];
    } else {
        return JSON.parse(favourites);
    };
};

export function saveToFavouriteProducts(favourites) {
    localStorage.setItem(favouritesKey, JSON.stringify(favourites));
};

export function getExistingBasketProducts() {
    const basket = localStorage.getItem(basketKey);

    if(!basket) {
        return [];
    } else {
        return JSON.parse(basket);
    };
};

export function saveToBasket(basket) {
    localStorage.setItem(basketKey, JSON.stringify(basket));
};

export function saveToken(token) {
    saveToStorage(tokenKey, token);
};
export function getToken() {
    return getFromStorage(tokenKey);
};

export function saveUser(user) {
    saveToStorage(userKey, user);
};
export function getUsername() {
    const user = getFromStorage(userKey);

    if (user) {
        return user.username;
    };

    return null;
};

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return null;
    };

    return JSON.parse(value);
};

export function logoutUser() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};