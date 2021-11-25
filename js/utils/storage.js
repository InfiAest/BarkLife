const tokenKey = "token";
const userKey = "user";
export const cartKey = "Cart";

export function getExistingCartProducts() {
    const cart = localStorage.getItem(cartKey);

    if(!cart) {
        return [];
    }
    else {
        return JSON.parse(cart);
    }
};

export function saveToCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
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
    }

    return null;
};

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return null;
    }

    return JSON.parse(value);
};

export function logoutUser() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};