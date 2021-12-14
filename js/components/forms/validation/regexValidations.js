//validate url (ref:https://digitalfortress.tech/tips/top-15-commonly-used-regex/ & https://www.regexpal.com/?fam=104034)

export function validateURL(url) {
    const regEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
    const patternMatches = regEx.test(url);
    return patternMatches;
}

export function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

//checks that password has 1 lowercase, 1 uppercase, 1 number and longer than 6 characters
export function validatePassword(password) {
    const regEx = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{6,}$/;
    const patternMatches = regEx.test(password);
    return patternMatches;
}

//checks the number is to 2 decimal places
export function validatePrice(price) {
    const regEx = /((\d+)(\.\d{2}))$/;
    const patternMatches = regEx.test(price);
    return patternMatches;
}