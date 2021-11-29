//validate url (ref:https://digitalfortress.tech/tips/top-15-commonly-used-regex/ & https://www.regexpal.com/?fam=104034)

export function validateURL(url) {
    const regEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;
    const patternMatches = regEx.test(url);
    return patternMatches;
}